import * as React from 'react'

export interface Props {
  handleOnClick?: () => void
  /** the url of the left positioned image */
  imageUrl?: string
  showImage?: boolean
  /** the subtitle positioned bottom-left  */
  subTitleBottom?: string
  /** the subtitle positioned bottom-right  */
  subTitleBottomSide?: string
  /** the subtitle positioned top-left  */
  subTitleTop?: string
  /** the subtitle positioned top-right  */
  subTitleTopSide?: string
  /** the main title of the item  */
  title: string
}

export const MediaListItemA: React.StatelessComponent<Props> = props => {
  const { imageUrl, showImage, subTitleBottom, subTitleBottomSide, 
    subTitleTop, subTitleTopSide, title } = props

  return (
    <div className='media-list-item__a'>
      {
        showImage &&
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
