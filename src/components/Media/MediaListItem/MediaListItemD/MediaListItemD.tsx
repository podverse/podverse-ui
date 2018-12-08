import * as React from 'react'

export interface Props {
  subTitle?: string
  subTitleSide?: string
  handleOnClick?: () => void
  title: string
  titleSide?: string
}

export const MediaListItemD: React.StatelessComponent<Props> = props => {
  const { handleOnClick, subTitle, subTitleSide, title, titleSide } = props

  return (
    <div
      className='media-list-item__d'
      onClick={handleOnClick}>
      {
        titleSide &&
          <div className='media-list-item-d__title-side'>
            {titleSide}
          </div>
      }
      <div className='media-list-item-d__title'>
        {title}
      </div>
      {
        subTitleSide &&
        <div className='media-list-item-d__sub-title-side'>
          {subTitleSide}
        </div>
      }
      {
        subTitle &&
          <div className='media-list-item-d__sub-title'>
            {subTitle}
          </div>
      }
    </div>
  )
}
