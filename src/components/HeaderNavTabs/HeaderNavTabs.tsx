import * as React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
const uuidv4 = require('uuid/v4')

export interface Props {
  handleLinkClick?: any
  items: any[]
}

const getHeaderNavTabsClassName = (props) => {
  return classNames(
    'header-nav-tabs',
    props.className
  )
}

export const HeaderNavTabs: React.StatelessComponent<Props> = props => {
  const { handleLinkClick, items } = props

  const buttons = items.map((x) => {
    const headerNavTabsClassName = classNames(
      'header-nav-tab',
      {
        'active': x.isActive
      }
    )

    return (
      <Link
        as={x.as}
        href={x.href}
        key={uuidv4()}>
        <a
          className={headerNavTabsClassName}
          onClick={handleLinkClick}>
          {x.label}
        </a>
      </Link>
    )
  })

  return (
    <div className={getHeaderNavTabsClassName(props)}>
      {buttons}
    </div>
  )
}
