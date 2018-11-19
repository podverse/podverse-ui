import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap'

export interface Props {
  className?: string
  isLoading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  text?: string
}

const PVButton: React.StatelessComponent<Props> = props => {
  const { className, isLoading, onClick, text } = props

  return (
    <Button
      className={className}
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

export default PVButton
