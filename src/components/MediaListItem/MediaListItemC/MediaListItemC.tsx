import * as React from 'react'

export interface Props {
  date?: string
  description?: string
  handleOnClick?: () => void
  imageUrl?: string
  title: string
}

export const MediaListItemC = (props: Props) => {
  const { date, description, imageUrl, title } = props

  return (
    <div className='media-list-item__c'>
      {
        imageUrl &&
          <img className='media-list-item-c__image' src={imageUrl} />
      }
      <div className='text-wrapper'>
        {
          date &&
            <div className='media-list-item-c__date'>
              {date}
            </div>
        }
        <div className='media-list-item-c__title'>
          {title}
        </div>
      </div>
      {
        description &&
        <div className='media-list-item-c__description'>
          {description}
        </div>
      }
    </div>
  )
}
