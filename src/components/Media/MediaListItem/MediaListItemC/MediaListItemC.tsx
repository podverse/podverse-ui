import * as React from 'react'

export interface Props {
  date?: string
  description?: string
  handleOnClick?: () => void
  title: string
}

export const MediaListItemC: React.StatelessComponent<Props> = props => {
  const { date, description, title } = props

  return (
    <div className='media-list-item__c'>
      <div className='media-list-item-c__left'>
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
          {
            description &&
            <div className='media-list-item-c__description'>
              {description}
            </div>
          }
        </div>
      </div>
    </div>
  )
}
