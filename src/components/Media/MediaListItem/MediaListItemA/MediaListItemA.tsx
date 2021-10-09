import * as React from 'react'
import { PVImage } from 'components/PVImage/PVImage'

export interface Props {
  censorNSFWText?: boolean
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
  const { censorNSFWText = false, imageUrl, showImage, subTitleBottom, subTitleBottomShouldTruncate,
    subTitleBottomSide, subTitleMiddle, subTitleMiddleShouldTruncate,
    subTitleMiddleSide, subTitleTop, subTitleTopShouldTruncate, subTitleTopSide,
    title } = props

  return (
    <div className='media-list-item__a'>
      {
        showImage &&
          <div className='media-list-item-a__image'>
            <PVImage
              height='5.25rem'
              imageUrl={imageUrl}
              width='5.25rem' />
          </div>
      }
      <div className='text-wrapper'>
        {
          title &&
          <div className='media-list-item-a__title'>
            {title.sanitize(censorNSFWText)}
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
              {subTitleTop.sanitize(censorNSFWText)}
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
              {subTitleMiddle.sanitize(censorNSFWText)}
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
