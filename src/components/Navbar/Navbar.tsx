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
  dropdownMenuIsOpen?: boolean
  dropdownText?: any
  handleLinkClick: any
  handleToggleDropdownMenu: any
  handleToggleMobileMenu: any
  mobileMenuIsOpen?: boolean
  navItems?: any
}

type State = {}

export class Navbar extends React.Component<Props, State> {

  render () {
    const { brandHideText, brandText, brandUrl, dropdownItems, dropdownMenuIsOpen,
      dropdownText, handleLinkClick, handleToggleDropdownMenu, handleToggleMobileMenu,
      mobileMenuIsOpen, navItems } = this.props

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
            {...(brandUrl ? { as: brandUrl } : {})}
            {...(brandUrl ? { href: brandUrl + '?refresh=true' } : {})}>
            <NavbarBrand onClick={handleLinkClick}>{
              brandHideText ? null : brandText
            }</NavbarBrand>
          </Link>
          <NavbarToggler onClick={handleToggleMobileMenu} />
          <Collapse isOpen={mobileMenuIsOpen} navbar>
            <Nav className='ml-auto' navbar>
              {navItemsEls}
              {mobileNavItemsEls}
              <Dropdown
                inNavbar
                isOpen={dropdownMenuIsOpen}
                nav
                toggle={handleToggleDropdownMenu}>
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
