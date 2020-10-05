import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
  imageUrl?: any
  size?: string
}

export const ImageSquare: React.StatelessComponent<Props> = props => {
  const { imageUrl, size = '6.75rem' } = props

  const sizeStyle = {
    height: size,
    lineHeight: size,
    width: size
  }

  return (
    <div
      className='pv-image-square-wrapper'
      style={sizeStyle}>
      {
        imageUrl ?
          <img
            className='pv-image-square-wrapper__image'
            src={imageUrl}
            style={sizeStyle} />
          : <FontAwesomeIcon icon='podcast' />
      }
    </div>
  )
}
