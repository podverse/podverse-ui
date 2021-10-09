import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
  height?: string
  imageUrl?: any
  width?: string
}

export const PVImage: React.StatelessComponent<Props> = props => {
  const { height, imageUrl, width } = props

  const sizeStyle = {
    height,
    lineHeight: height,
    width
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
