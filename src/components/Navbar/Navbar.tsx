import * as React from 'react'
import {
  Collapse,
  Navbar as BSNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  brandImageUrl?: string
  brandText?: string
  brandUrl?: string
  dropdownItems?: any
  dropdownText?: any
  navItems?: any
}

type State = {
  isOpen: boolean
}

export class Navbar extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    const { brandImageUrl, brandText, brandUrl, dropdownItems,
      dropdownText, navItems } = this.props

    const navItemsEls = navItems.map(x =>
      <Link
        {...(x.href ? { href: x.href } : {})}
        {...(x.as ? { as: x.as } : {})}>
        <NavItem>
          <NavLink>
            {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
          </NavLink>
        </NavItem>
      </Link>
    )

    const dropdownItemsEls = dropdownItems.map(x =>
      <Link
        {...(x.href ? { href: x.href } : {})}
        {...(x.as ? { as: x.as } : {})}>
        <DropdownItem>{x.label}</DropdownItem>
      </Link>
    )

    return (
      <div className='navbar__bg'>
        <BSNavbar color='light' light expand='sm'>
          <Link
            {...(brandUrl ? { href: brandUrl } : {})}>
            <NavbarBrand>{
              brandImageUrl ? <img src={brandImageUrl} /> : brandText
            }</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {navItemsEls}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {dropdownText}
                </DropdownToggle>
                <DropdownMenu right>
                  {dropdownItemsEls}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </BSNavbar>
      </div>
    )
  }
}
