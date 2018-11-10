import * as React from 'react';
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
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  brandImageUrl?: string
  brandText?: string
  brandUrl?: string
  dropdownItems?: any
  dropdownText?: string
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
      <NavItem>
        <NavLink href={x.href}>
          {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
        </NavLink>
      </NavItem>
    )

    const dropdownItemsEls = dropdownItems.map(x =>
      <DropdownItem href={x.href}>{x.label}</DropdownItem>
    )

    return (
      <div className='navbar__bg'>
        <BSNavbar color='light' light expand='sm'>
          <NavbarBrand href={brandUrl}>{
            brandImageUrl ? <img src={brandImageUrl} /> : brandText
          }</NavbarBrand>
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
