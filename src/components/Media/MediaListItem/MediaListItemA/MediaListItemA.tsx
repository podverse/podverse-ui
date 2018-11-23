import * as React from 'react'

export interface Props {
  imageUrl?: string
  moreMenuItems?: any
  showImage?: boolean
  subTitleBottom?: string
  subTitleBottomSide?: string
  subTitleMiddle?: string
  subTitleMiddleSide?: string
  subTitleTop?: string
  subTitleTopSide?: string
  title: string
}

export const MediaListItemA: React.StatelessComponent<Props> = props => {
  const { imageUrl, showImage, subTitleBottom, subTitleBottomSide,
    subTitleMiddle, subTitleMiddleSide, subTitleTop, subTitleTopSide,
    title } = props

  return (
    <div className='media-list-item__a'>
      {
        (showImage && imageUrl) &&
          <img className='media-list-item-a__image' src={imageUrl} />
      }
      <div className='text-wrapper'>
        <div className='media-list-item-a__title'>
          {title}
        </div>
        <div className='media-list-item-a__sub-top-side'>
          {subTitleTopSide}
        </div>
        <div className='media-list-item-a__sub-top'>
          {subTitleTop}
        </div>
        <div className='media-list-item-a__sub-middle-side'>
          {subTitleMiddleSide}
        </div>
        <div className='media-list-item-a__sub-middle'>
          {subTitleMiddle}
        </div>
        <div className='media-list-item-a__sub-bottom-side'>
          {subTitleBottomSide}
        </div>
        <div className='media-list-item-a__sub-bottom'>
          {subTitleBottom}
        </div>
      </div>
    </div>
  )
}

MediaListItemA.defaultProps = {
  showImage: true
}
