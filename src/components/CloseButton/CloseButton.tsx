import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const CloseButton: React.StatelessComponent<Props> = props => {
  const { onClick } = props

  return (
    <button
      className='close-btn'
      onClick={onClick}>
      <FontAwesomeIcon icon='times' />
    </button>
  )
}
