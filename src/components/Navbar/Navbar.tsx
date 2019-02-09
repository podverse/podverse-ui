import * as React from 'react'
import {
  Collapse,
  Navbar as BSNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clone } from 'lib/utility'

type Props = {
  brandHideText?: boolean
  brandText?: string
  brandUrl?: string
  dropdownItems?: any
  dropdownText?: any
  handleLinkClick: any
  navItems?: any
}

type State = {
  dropdownIsOpen: boolean
  navBarIsOpen: boolean
}

export class Navbar extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.toggleNavBar = this.toggleNavBar.bind(this)
    this.state = {
      dropdownIsOpen: false,
      navBarIsOpen: false
    }
  }

  toggleDropdown () {
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen })
  }

  toggleNavBar () {
    this.setState({ navBarIsOpen: !this.state.navBarIsOpen })
  }

  render () {
    const { brandHideText, brandText, brandUrl, dropdownItems, dropdownText,
      handleLinkClick, navItems } = this.props

    const navItemsEls = navItems.map(x =>
      <Link
        {...(x.href ? { href: x.href } : {})}
        {...(x.as ? { as: x.as } : {})}>
        <NavItem>
          <NavLink onClick={handleLinkClick}>
            {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
          </NavLink>
        </NavItem>
      </Link>
    )

    const dropdownItemsEls = dropdownItems.map(x =>
      <Link
        {...(x.href ? { href: x.href } : {})}
        {...(x.as ? { as: x.as } : {})}>
        <DropdownItem
          onClick={event => {
            x.onClick()
            this.setState({ dropdownIsOpen: false })
          }}>
          {x.label}
        </DropdownItem>
      </Link>
    )

    const mobileNavItems = clone(dropdownItems)
    const mobileNavItemsEls = mobileNavItems.map(x =>
      <Link
        {...(x.href ? { href: x.href } : {})}
        {...(x.as ? { as: x.as } : {})}>
        <NavItem className='mobile-nav-item'>
          <NavLink onClick={x.onClick}>
            {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
          </NavLink>
        </NavItem>
      </Link>
    )

    return (
      <div className='navbar__bg'>
        <BSNavbar color='light' light expand='sm'>
          <Link
            {...(brandUrl ? { href: brandUrl } : {})}>
            <NavbarBrand onClick={handleLinkClick}>{
              brandHideText ? null : brandText
            }</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggleNavBar} />
          <Collapse isOpen={this.state.navBarIsOpen} navbar>
            <Nav className='ml-auto' navbar>
              {navItemsEls}
              {mobileNavItemsEls}
              <Dropdown
                inNavbar
                isOpen={this.state.dropdownIsOpen}
                nav
                toggle={this.toggleDropdown}>
                <DropdownToggle nav caret>
                  {dropdownText}
                </DropdownToggle>
                <DropdownMenu right>
                  {dropdownItemsEls}
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </BSNavbar>
      </div>
    )
  }
}
