import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap'
import classNames from 'classnames'

export interface Props {
  children?: any
  className?: string
  color?: string
  disabled?: boolean
  isOnlyIcon?: boolean
  isLoading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  text?: string
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
  const { children, color, disabled, isLoading, onClick, text } = props

  const buttonClass = getButtonClassName(props)

  return (
    <Button
      className={buttonClass}
      color={color}
      disabled={disabled}
      onClick={onClick}>
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
