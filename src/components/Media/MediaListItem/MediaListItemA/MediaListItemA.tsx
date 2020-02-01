import * as React from 'react'
import { ImageSquare } from 'components/Image/ImageSquare'

export interface Props {
  imageUrl?: string
  moreMenuItems?: any
  showImage?: boolean
  subTitleBottom?: string
  subTitleBottomShouldTruncate?: boolean
  subTitleBottomSide?: string
  subTitleMiddle?: string
  subTitleMiddleShouldTruncate?: boolean
  subTitleMiddleSide?: string
  subTitleTop?: string
  subTitleTopShouldTruncate?: boolean
  subTitleTopSide?: string
  title: string
}

export const MediaListItemA: React.StatelessComponent<Props> = props => {
  const { imageUrl, showImage, subTitleBottom, subTitleBottomShouldTruncate,
    subTitleBottomSide, subTitleMiddle, subTitleMiddleShouldTruncate,
    subTitleMiddleSide, subTitleTop, subTitleTopShouldTruncate, subTitleTopSide,
    title } = props

  return (
    <div className='media-list-item__a'>
      {
        showImage &&
          <div className='media-list-item-a__image'>
            <ImageSquare
              imageUrl={imageUrl}
              size='4.125rem' />
          </div>
      }
      <div className='text-wrapper'>
        {
          title &&
          <div className='media-list-item-a__title'>
            {title}
          </div>
        }
        {
          subTitleTopSide &&
            <div className='media-list-item-a__sub-top-side'>
              {subTitleTopSide}
            </div>
        }
        {
          subTitleTop &&
            <div className={`media-list-item-a__sub-top ${subTitleTopShouldTruncate ? 'truncate-lines' : ''}`}>
              {subTitleTop}
            </div>
        }
        {
          subTitleMiddleSide &&
            <div className='media-list-item-a__sub-middle-side'>
              {subTitleMiddleSide}
            </div>
        }
        {
          subTitleMiddle &&
            <div className={`media-list-item-a__sub-middle ${subTitleMiddleShouldTruncate ? 'truncate-lines' : ''}`}>
              {subTitleMiddle}
            </div>
        }
        {
          subTitleBottomSide &&
            <div className='media-list-item-a__sub-bottom-side'>
              {subTitleBottomSide}
            </div>
        }
        {
          subTitleBottom &&
            <div className={`media-list-item-a__sub-bottom ${subTitleBottomShouldTruncate ? 'truncate-lines' : ''}`}>
              {subTitleBottom}
            </div>
        }
      </div>
    </div>
  )
}

MediaListItemA.defaultProps = {
  showImage: true
}
