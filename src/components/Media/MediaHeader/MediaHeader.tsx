import * as React from 'react'

type Props = {
  bottomText?: string | Array<any>
  bottomTextSide?: string
  imageUrl?: string
  subTitle?: string | Array<any>
  subTitleLink?: string
  title?: string
  titleLink?: string
}

export const MediaHeader: React.StatelessComponent<Props> = props => {
  const { bottomText, bottomTextSide, imageUrl, subTitle, subTitleLink,
    title, titleLink } = props

  let parsedSubTitle = ''
  if (subTitle instanceof Array) {
    for (const item of subTitle) {
      parsedSubTitle += `${item}, `
    }
    parsedSubTitle.replace(/,\s*$/, '')
  } else if (subTitle) {
    parsedSubTitle = subTitle
  }

  let parsedBottomText = ''
  if (bottomText instanceof Array) {
    for (const item of bottomText) {
      parsedBottomText += `${item}, `
    }
    parsedBottomText.replace(/,\s*$/, '')
  } else if (bottomText) {
    parsedBottomText = bottomText
  }

  return (
    <div className='media-header'>
      <img className='media-header__image' src={imageUrl} />
      <div className='text-wrapper'>
        {
          title &&
            <a className='media-header__title' href={titleLink}>{title}</a>
        }
        {
          parsedSubTitle &&
            <a className='media-header__sub-title' href={subTitleLink}>{parsedSubTitle}</a>
        }
        {
          bottomTextSide &&
            <div className='media-header__bottom-text-side'>{bottomTextSide}</div>
        }
        {
          parsedBottomText &&
            <div className='media-header__bottom-text'>{bottomText}</div>
        }
      </div>
    </div>
  )
}
