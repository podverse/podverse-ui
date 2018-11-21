import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap'

export interface Props {
  className?: string
  color?: string
  disabled?: boolean
  isLoading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  text?: string
}

export const PVButton: React.StatelessComponent<Props> = props => {
  const { className, color, disabled, isLoading, onClick, text } = props

  return (
    <Button
      className={className}
      color={color}
      disabled={disabled}
      onClick={onClick}>
      {
        isLoading ?
          <FontAwesomeIcon
            icon='spinner'
            spin />
          : text
      }
    </Button>
  )
}
