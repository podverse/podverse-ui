import * as React from 'react'
const sanitizeHtml = require('sanitize-html')

export interface Props {
  censorNSFWText?: boolean
  date?: string
  description?: string
  handleOnClick?: () => void
  title: string
}

export const MediaListItemC: React.StatelessComponent<Props> = props => {
  const { censorNSFWText = false, date, description, title } = props

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
            {title ? title.sanitize(censorNSFWText) : ''}
          </div>
          {
            description &&
              <div
                className='media-list-item-c__description'
                dangerouslySetInnerHTML={
                  {
                    __html: sanitizeHtml(description.sanitize(censorNSFWText))
                  }}
              />
          }
        </div>
      </div>
    </div>
  )
}
