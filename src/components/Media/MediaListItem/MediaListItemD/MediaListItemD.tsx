import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
  censorNSFWText?: boolean
  handleOnClick?: () => void
  itemId: string
  loadingItemId?: string
  subTitle?: string
  subTitleSide?: string
  title: string
  titleSide?: string
}

export const MediaListItemD: React.StatelessComponent<Props> = props => {
  const { censorNSFWText = false, handleOnClick, itemId, loadingItemId, subTitle, subTitleSide, title,
    titleSide } = props

  return (
    <div
      className='media-list-item__d'
      onClick={handleOnClick}>
      {
        titleSide &&
          <div className='media-list-item-d__title-side'>
            {loadingItemId === itemId ? <FontAwesomeIcon icon='spinner' spin /> : titleSide}
          </div>
      }
      <div className='media-list-item-d__title'>
        {title.sanitize(censorNSFWText)}
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
            {subTitle.sanitize(censorNSFWText)}
          </div>
      }
    </div>
  )
}
