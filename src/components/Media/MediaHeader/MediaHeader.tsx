import * as React from 'react'
import Link from 'next/link'
import { getLinkPodcastHref, getLinkPodcastAs, getLinkCategoryHref,
  getLinkCategoryAs } from 'lib/constants'
import { convertToNowPlayingItem } from 'lib/nowPlayingItem'
import { readableDate } from 'lib/utility'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
const uuidv4 = require('uuid/v4')

type Props = {
  episode?: any
  handleLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleToggleSubscribe?: any
  isSubscribed?: boolean
  isSubscribing?: boolean
  mediaRef?: any
  nowPlayingItem?: any
  podcast?: any
}

const generateAuthorText = authors => {
  let authorText = ''
  for (let i = 0; i < authors.length; i++) {
    const author = authors[i]
    authorText += `${author.name}${i < authors.length - 1 ? ', ' : ''}`
  }

  return authorText
}

const generateCategoryNodes = (categories, handleLinkClick) => {
  let categoryNodes: any[] = []

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    let categoryText = category.title
    const categoryAs = getLinkCategoryAs(category.id)
    const categoryHref = getLinkCategoryHref(category.id)

    categoryNodes.push(
      <React.Fragment key={uuidv4()}>
        <Link
          {...(categoryHref ? { href: categoryHref } : {})}
          {...(categoryAs ? { as: categoryAs } : {})}
          key={uuidv4()}>
          <a
            key={uuidv4()}
            onClick={handleLinkClick}>{categoryText}</a>
        </Link>
        {
          i < categories.length - 1 &&
          <React.Fragment key={uuidv4()}>,&nbsp;</React.Fragment>
        }
      </React.Fragment>
    )
  }

  return categoryNodes
}

export const MediaHeader: React.StatelessComponent<Props> = props => {
  const { episode, handleLinkClick, handleToggleSubscribe, isSubscribed, isSubscribing,
    mediaRef, nowPlayingItem, podcast } = props

  let bottomText
  let bottomTextSide
  let imgUrl
  let subTitle
  let title
  let titleAs
  let titleHref

  if (episode) {
    imgUrl = episode.podcast.imageUrl
    title = episode.podcast.title
    titleAs = getLinkPodcastAs(episode.podcast.id)
    titleHref = getLinkPodcastHref(episode.podcast.id)
    subTitle = episode.title
    bottomText = readableDate(episode.pubDate)
  } else if (mediaRef) {
    const item = convertToNowPlayingItem(mediaRef)
    const { podcastAuthors, podcastCategories, podcastImageUrl, podcastId, podcastTitle
      } = item
    imgUrl = podcastImageUrl
    title = podcastTitle
    titleAs = getLinkPodcastAs(podcastId)
    titleHref = getLinkPodcastHref(podcastId)
    subTitle = generateAuthorText(podcastAuthors)
    bottomText = generateCategoryNodes(podcastCategories, handleLinkClick)
  } else if (nowPlayingItem) {
    const { episodePubDate, episodeTitle, podcastImageUrl, podcastId, podcastTitle
      } = nowPlayingItem
    imgUrl = podcastImageUrl
    title = podcastTitle
    titleAs = getLinkPodcastAs(podcastId)
    titleHref = getLinkPodcastHref(podcastId)
    subTitle = episodeTitle
    bottomText = readableDate(episodePubDate)
  } else if (podcast) {
    subTitle = generateAuthorText(podcast.authors)
    bottomText = generateCategoryNodes(podcast.categories, handleLinkClick)
    imgUrl = podcast.imageUrl
    title = podcast.title
  }

  return (
    <div className='media-header'>
      <img className='media-header__image' src={imgUrl} />
      <div className='text-wrapper'>
        <div className='media-header__top'>
          {
            title &&
              <React.Fragment>
                {
                  titleHref ?
                    <Link
                      {...(titleHref ? { href: titleHref } : {})}
                      {...(titleAs ? { as: titleAs } : {})}>
                      <a
                        className='media-header__title'
                        onClick={handleLinkClick}>{title}</a>
                    </Link> : <span className='media-header__title'>{title}</span>
                }
              </React.Fragment>
          }
          <button
            className='media-header__subscribe'
            onClick={handleToggleSubscribe}>
            {
              isSubscribing ?
                <FontAwesomeIcon icon='spinner' spin />
                :
                <React.Fragment>
                  {
                    isSubscribed ?
                      <FontAwesomeIcon icon={fasStar} />
                      // @ts-ignore
                      : <FontAwesomeIcon icon={farStar} />
                  }
                </React.Fragment>
            }
          </button>
        </div>
        <div className='media-header__middle'>
          {
            subTitle &&
              <div className='media-header__sub-title'>{subTitle}</div>
          }
        </div>
        <div className='media-header__bottom'>
          {
            bottomTextSide &&
              <div className='media-header__bottom-text-side'>{bottomTextSide}</div>
          }
          {
            bottomText &&
              <div className='media-header__bottom-text'>{bottomText}</div>
          }
        </div>
      </div>
    </div>
  )
}
