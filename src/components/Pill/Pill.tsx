import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export interface Props {
  href?: string
  isActive?: boolean
  isLoading?: boolean
  noBorder?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  rel?: string
  target?: string
  text?: any
  title?: string
}

const getPillClassName = (props) => {
  return classNames(
    'pill',
    'centered-axis-xy-wrapper',
    props.className,
    {
      'is-active': props.isActive,
      'is-loading': props.isLoading,
      'no-border': props.noBorder
    }
  )
}

export const Pill: React.StatelessComponent<Props> = props => {
  const { href, isLoading, onClick, rel, target, text, title } = props
  const pillClass = getPillClassName(props)

  return (
    <a
      className={pillClass}
      href={href ? href : 'javascript:;'}
      onClick={onClick}
      rel={rel}
      target={target}
      title={title}>
      {
        isLoading &&
          <FontAwesomeIcon
            className='centered-axis-xy'
            icon='spinner'
            spin />
      }
      <span>{text}</span>
    </a>
  )
}
