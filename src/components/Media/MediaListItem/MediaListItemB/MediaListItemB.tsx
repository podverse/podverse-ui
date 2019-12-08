import * as React from 'react'

export interface Props {
  handleOnClick?: () => void
  /** the url of the left positioned image */
  imageUrl?: string
  /** the bottom-right positioned subtitle  */
  subTitleSide?: string
  /** the subtitle  */
  subTitle?: string
  /** the main title of the item  */
  title: string
}

export const MediaListItemB: React.StatelessComponent<Props> = props => {
  const { imageUrl, subTitle, subTitleSide, title } = props

  return (
    <div className='media-list-item__b'>
      {
        imageUrl &&
          <img
            className='media-list-item-b__image'
            src={imageUrl} />
      }
      <div className='text-wrapper'>
        {
          title &&
            <div className='media-list-item-b__title'>
              {title}
            </div>
        }
        {
          subTitleSide &&
            <div className='media-list-item-b__sub-side'>
              {subTitleSide}
            </div>
        }
        {
          subTitle &&
            <div className='media-list-item-b__sub'>
              {subTitle}
            </div>
        }
      </div>
    </div>
  )
}
