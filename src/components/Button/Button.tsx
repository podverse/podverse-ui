import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap'
import classNames from 'classnames'

export interface Props {
  children?: any
  className?: string
  color?: string
  dataclipboardtarget?: string
  disabled?: boolean
  isActive?: boolean
  isOnlyIcon?: boolean
  isLoading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  outline?: boolean
  tag?: string
  text?: any
}

const getButtonClassName = (props) => {
  return classNames(
    props.className,
    {
      'only-icon': props.isOnlyIcon
    }
  )
}

export const PVButton: React.StatelessComponent<Props> = props => {
  const { children, color, dataclipboardtarget, disabled, isActive, isLoading, onClick, outline,
    tag, text } = props

  const buttonClass = getButtonClassName(props)

  return (
    <Button
      active={isActive}
      className={buttonClass}
      color={color}
      data-clipboard-target={dataclipboardtarget}
      disabled={disabled}
      onClick={onClick}
      outline={outline}
      tag={tag}>
      {
        isLoading ?
          <FontAwesomeIcon
            icon='spinner'
            spin />
          : text || children
      }
    </Button>
  )
}
