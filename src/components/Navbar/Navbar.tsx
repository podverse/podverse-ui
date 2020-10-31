import * as React from 'react'
import { Navbar as BSNavbar, NavbarBrand, Nav, NavItem, NavLink, Dropdown,
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  brandAs?: string
  brandHideText?: boolean
  brandText?: string
  brandHref?: string
  dropdowns?: any
  handleLinkClick: any
  handleToggleDropdownMenu: any
  isDarkMode?: boolean
  navItems?: any
  pageKey?: string
}

type State = {
  dropdownEls?: any[]
  navItemsEls?: any[]
}

export class Navbar extends React.Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {}
  }

  generateNavItems = () => {
    const { navItems, pageKey } = this.props
    const navItemKey = 'navItemKey'

    const navItemsEls = navItems.map((x, index) => {
      if (x.href) {
        return (
          <Link
            key={`${navItemKey}${index}`}
            href={x.href}
            as={x.as}>
            <NavItem
              key={`${navItemKey}b${index}`}
              active={pageKey ? x.pageKey === pageKey : false}>
              <NavLink
                {...(x.href ? { href: x.href } : {})}
                onClick={x.onClick}>
                {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
              </NavLink>
            </NavItem>
          </Link>
        )
      } else {
        return (
          <NavItem
            key={`${navItemKey}b${index}`}
            active={pageKey ? x.pageKey === pageKey : false}>
            <NavLink
              onClick={x.onClick}>
              {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
            </NavLink>
          </NavItem>
        )
      }
    })

    return navItemsEls
  }

  generateDropdowns = () => {
    const { dropdowns } = this.props
    const dropdownEls = dropdowns.map((dropdown, dropdownIndex) => {
      const dropdownKey = `dropdown${dropdownIndex}`
      const dropdownMenuIsOpenKey = `${dropdownKey}MenuIsOpen`
      const dropdownMenuIsOpen = this.state[dropdownMenuIsOpenKey]

      const dropdownItemsEls = dropdown.items.map((dropdownItem, dropdownItemIndex) => {
        const dropdownItemKey = `${dropdownKey}DropdownItem${dropdownItemIndex}`
        if (dropdownItem.href) {
          return (
            <Link
              key={dropdownItemKey}
              href={dropdownItem.href}
              as={dropdownItem.as}>
              <DropdownItem
                {...(dropdownItem.href ? { href: dropdownItem.href } : {})}
                onClick={event => {
                  dropdownItem.onClick()
                  this.setState({ [dropdownMenuIsOpenKey]: false })
                }}>
                {dropdownItem.label}
              </DropdownItem>
            </Link>
          )
        } else {
          return (
            <DropdownItem
              key={dropdownItemKey}
              onClick={event => {
                dropdownItem.onClick()
                this.setState({ [dropdownMenuIsOpenKey]: false })
              }}>
              {dropdownItem.label}
            </DropdownItem>
          )
        }
      })

      return (
        <Dropdown
          inNavbar
          isOpen={dropdownMenuIsOpen}
          nav
          toggle={() => this.toggleDropdown(dropdownIndex)}>
          <DropdownToggle caret>
            {dropdown.icon && <FontAwesomeIcon icon={dropdown.icon} />}
            {dropdown.label && dropdown.label}
          </DropdownToggle>
          <DropdownMenu right>
            {dropdownItemsEls}
          </DropdownMenu>
        </Dropdown>
      )
    })
    
    return dropdownEls
  }

  toggleDropdown = (dropdownIndex) => {
    const dropdownKey = `dropdown${dropdownIndex}`
    const dropdownMenuIsOpenKey = `${dropdownKey}MenuIsOpen`
    const dropdownIsShowing = this.state[dropdownMenuIsOpenKey]
    this.setState({ [dropdownMenuIsOpenKey]: !dropdownIsShowing })
  }

  render () {
    const { brandAs, brandHideText, brandText, brandHref, handleLinkClick, isDarkMode } = this.props
    const navItemsEls = this.generateNavItems()
    const dropdownEls = this.generateDropdowns()

    return (
      <div className='navbar__bg'>
        <BSNavbar
          color={isDarkMode ? 'dark' : 'light'}
          {...(isDarkMode ? { dark: true } : { light: true })}>
          <Link
            as={brandAs || ''}
            href={brandHref || ''}>
            <NavbarBrand
              {...(brandHref ? { href: brandHref } : {})}
              onClick={handleLinkClick}>{
              brandHideText ? null : brandText
            }</NavbarBrand>
          </Link>
          <Nav className='ml-auto' navbar>
            {navItemsEls}
            {dropdownEls}
          </Nav>
        </BSNavbar>
      </div>
    )
  }
}
