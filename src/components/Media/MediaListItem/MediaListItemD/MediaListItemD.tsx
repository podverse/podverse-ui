import * as React from 'react'

export interface Props {
  subTitle?: string
  subTitleSide?: string
  handleOnClick?: () => void
  title: string
}

export const MediaListItemD: React.StatelessComponent<Props> = props => {
  const { handleOnClick, subTitle, subTitleSide, title } = props

  return (
    <div
      className='media-list-item__d'
      onClick={handleOnClick}>
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
