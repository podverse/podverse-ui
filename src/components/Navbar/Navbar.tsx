import * as React from 'react'
import { Collapse, Navbar as BSNavbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Dropdown,
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clone } from 'lib/utility'

type Props = {
  brandAs?: string
  brandHideText?: boolean
  brandText?: string
  brandHref?: string
  dropdownItems?: any
  dropdownMenuIsOpen?: boolean
  dropdownText?: any
  handleLinkClick: any
  handleToggleDropdownMenu: any
  handleToggleMobileMenu: any
  isDarkMode?: boolean
  mobileMenuIsOpen?: boolean
  navItems?: any
}

type State = {}

export class Navbar extends React.Component<Props, State> {

  render () {
    const { brandAs, brandHideText, brandText, brandHref, dropdownItems,
      dropdownMenuIsOpen, dropdownText, handleLinkClick, handleToggleDropdownMenu,
      handleToggleMobileMenu, isDarkMode, mobileMenuIsOpen, navItems } = this.props

    const navItemKey = 'navItemKey'
    const navItemsEls = navItems.map((x, index) =>
      <Link
        key={`${navItemKey}${index}`}
        {...(x.href ? { href: x.href } : {})}
        {...(x.as ? { as: x.as } : {})}>
        <NavItem key={`${navItemKey}b${index}`}>
          <NavLink
            {...(x.href ? { href: x.href } : {})}
            onClick={x.onClick}>
            {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
          </NavLink>
        </NavItem>
      </Link>
    )

    const navbarDropdownItemKey = 'navbarDropdownItemKey'
    const dropdownItemsEls = dropdownItems.map((x, index) => {
      if (x.href) {
        return (
          <Link
            key={`${navbarDropdownItemKey}${index}`}
            {...(x.href ? { href: x.href } : {})}
            {...(x.as ? { as: x.as } : {})}>
            <DropdownItem
              {...(x.href ? { href: x.href } : {})}
              onClick={event => {
                x.onClick()
                this.setState({ dropdownIsOpen: false })
              }}>
              {x.label}
            </DropdownItem>
          </Link>
        )
      } else {
        return (
          <DropdownItem
            key={`${navbarDropdownItemKey}${index}`}
            {...(x.href ? { href: x.href } : {})}
            onClick={event => {
              x.onClick()
              this.setState({ dropdownIsOpen: false })
            }}>
            {x.label}
          </DropdownItem>
        )
      }
    })

    const mobileNavItemKey = 'mobileNavItemKey'
    const mobileNavItems = clone(dropdownItems)
    const mobileNavItemsEls = mobileNavItems.map((x, index) => {
      if (x.href) {
        return (
          <Link
            key={`${mobileNavItemKey}${index}`}
            {...(x.href ? { href: x.href } : {})}
            {...(x.as ? { as: x.as } : {})}>
            <NavItem
              className='mobile-nav-item'
              key={`${mobileNavItemKey}b${index}`}>
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
            className='mobile-nav-item'
            key={`${mobileNavItemKey}b${index}`}>
            <NavLink
              onClick={x.onClick}>
              {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
            </NavLink>
          </NavItem>
        )
      }
    })

    return (
      <div className='navbar__bg'>
        <BSNavbar
          color={isDarkMode ? 'dark' : 'light'}
          {...(isDarkMode ? { dark: true } : { light: true })}
          expand='sm'>
          <Link
            {...(brandAs ? { as: brandAs } : {})}
            {...(brandHref ? { href: brandHref } : {})}>
            <NavbarBrand
              {...(brandHref ? { href: brandHref } : {})}
              onClick={handleLinkClick}>{
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
                <DropdownToggle caret>
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
