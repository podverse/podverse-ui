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
  mobileNavItems?: any
  navItems?: any
}

type State = {}

export class Navbar extends React.Component<Props, State> {

  render () {
    const { brandAs, brandHideText, brandText, brandHref, dropdownItems,
      dropdownMenuIsOpen, dropdownText, handleLinkClick, handleToggleDropdownMenu,
      handleToggleMobileMenu, isDarkMode, mobileMenuIsOpen,
      mobileNavItems, navItems } = this.props

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
              className={x.hideMobile ? 'hide-mobile' : ''}>
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
            className={x.hideMobile ? 'hide-mobile' : ''}>
            <NavLink
              onClick={x.onClick}>
              {x.icon ? <FontAwesomeIcon icon={x.icon} /> : x.label}
            </NavLink>
          </NavItem>
        )
      }
    })

    const navbarDropdownItemKey = 'navbarDropdownItemKey'
    const dropdownItemsEls = dropdownItems.map((x, index) => {
      if (x.href) {
        return (
          <Link
            key={`${navbarDropdownItemKey}${index}`}
            href={x.href}
            as={x.as}>
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
    const mobileNavItemEls = mobileNavItems.map((x, index) => {
      if (x.href) {
        return (
          <Link
            key={`${mobileNavItemKey}${index}`}
            href={x.href}
            as={x.as}>
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

    const mobileDropdownItemKey = 'mobileDropdownItemKey'
    const mobileDropdownItems = clone(dropdownItems)
    const mobileDropdownItemsEls = mobileDropdownItems.map((x, index) => {
      if (x.href) {
        return (
          <Link
            key={`${mobileDropdownItemKey}${index}`}
            href={x.href}
            as={x.as}>
            <NavItem
              key={`${mobileDropdownItemKey}b${index}`}
              className='mobile-nav-item'>
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
            key={`${mobileDropdownItemKey}b${index}`}
            className='mobile-nav-item'>
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
            as={brandAs || ''}
            href={brandHref || ''}>
            <NavbarBrand
              {...(brandHref ? { href: brandHref } : {})}
              onClick={handleLinkClick}>{
              brandHideText ? null : brandText
            }</NavbarBrand>
          </Link>
          <div className='navbar__mobile-nav-items'>
            {mobileNavItemEls}
          </div>
          <NavbarToggler onClick={handleToggleMobileMenu} />
          <Collapse isOpen={mobileMenuIsOpen} navbar>
            <Nav className='ml-auto' navbar>
              {navItemsEls}
              {mobileDropdownItemsEls}
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
