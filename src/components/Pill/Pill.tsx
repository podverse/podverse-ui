import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Props {
  colorWarning?: boolean
  fontWeight?: number
  href?: string
  icon?: IconProp
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
      'no-border': props.noBorder,
      'font-thin': props.fontWeight === 300,
      'color-warning': props.colorWarning
    }
  )
}

export const Pill: React.StatelessComponent<Props> = props => {
  const { href, icon, isLoading, onClick, rel, target, text, title } = props
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
      <span>
        { icon && 
          <>
            <FontAwesomeIcon
              className='pill-icon'
              icon={icon}
              size='sm' /> 
            &nbsp;
          </>
        }
        {text}
      </span>
    </a>
  )
}
