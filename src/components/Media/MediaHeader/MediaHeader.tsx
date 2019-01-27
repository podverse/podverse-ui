import * as React from 'react'
import Link from 'next/link'
import { getLinkEpisodeHref, getLinkEpisodeAs, getLinkPodcastHref, getLinkPodcastAs,
  getLinkCategoryHref, getLinkCategoryAs } from 'lib/constants'
import { convertToNowPlayingItem } from 'lib/nowPlayingItem'
import { readableDate } from 'lib/utility'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'

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

export const MediaHeader: React.StatelessComponent<Props> = props => {
  const { episode, handleLinkClick, handleToggleSubscribe, isSubscribed, isSubscribing,
    mediaRef, nowPlayingItem, podcast } = props

  let bottomText
  let bottomTextSide
  let imgUrl
  let subTitle
  let subTitleAs
  let subTitleHref
  let title
  let titleAs
  let titleHref

  if (episode) {
    bottomText = readableDate(episode.pubDate)
    bottomTextSide = ''
    imgUrl = episode.podcast.imageUrl
    subTitle = episode.title
    subTitleAs = getLinkEpisodeAs(episode.id)
    subTitleHref = getLinkEpisodeHref(episode.id)
    title = episode.podcast.title
    titleAs = getLinkPodcastAs(episode.podcast.id)
    titleHref = getLinkPodcastHref(episode.podcast.id)
  } else if (mediaRef) {
    const item = convertToNowPlayingItem(mediaRef)
    const { episodeId, episodePubDate, episodeTitle, podcastImageUrl, podcastId,
      podcastTitle } = item
    bottomText = readableDate(episodePubDate)
    bottomTextSide = ''
    imgUrl = podcastImageUrl
    subTitle = episodeTitle
    subTitleAs = getLinkEpisodeAs(episodeId)
    subTitleHref = getLinkEpisodeHref(episodeId)
    title = podcastTitle
    titleAs = getLinkPodcastAs(podcastId)
    titleHref = getLinkPodcastHref(podcastId)
  } else if (nowPlayingItem) {
    const { episodeId, episodePubDate, episodeTitle, podcastImageUrl, podcastId,
      podcastTitle } = nowPlayingItem

    bottomText = readableDate(episodePubDate)
    bottomTextSide = ''
    imgUrl = podcastImageUrl
    subTitle = episodeTitle
    subTitleAs = getLinkEpisodeAs(episodeId)
    subTitleHref = getLinkEpisodeHref(episodeId)
    title = podcastTitle
    titleAs = getLinkPodcastAs(podcastId)
    titleHref = getLinkPodcastHref(podcastId)
  } else if (podcast) {
    let categoryNodes: any[] = []
    let categories = podcast.categories || []

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      let categoryText = category.title
      const categoryAs = getLinkCategoryAs(category.id)
      const categoryHref = getLinkCategoryHref(category.id)

      categoryNodes.push(
        <React.Fragment>
          <Link
            {...(subTitleHref ? { href: categoryHref } : {})}
            {...(subTitleAs ? { as: categoryAs } : {})}>
            <a onClick={handleLinkClick}>{categoryText}</a>
          </Link>
          {
            i < categories.length - 1 &&
            <React.Fragment>,&nbsp;</React.Fragment>
          }
        </React.Fragment>
      )
    }

    let authorText = ''
    let authors = podcast.authors

    for (let i = 0; i < authors.length; i++) {
      const author = authors[i]
      authorText += `${author.name}${i < authors.length - 1 ? ', ' : ''}`
    }

    bottomText = categoryNodes
    bottomTextSide = ''
    imgUrl = podcast.imageUrl
    subTitle = authorText
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
              <React.Fragment>
                {
                  subTitleHref ?
                    <Link
                      {...(subTitleHref ? { href: subTitleHref } : {})}
                      {...(subTitleAs ? { as: subTitleAs } : {})}>
                      <a
                        className='media-header__sub-title'
                        onClick={handleLinkClick}>{subTitle}</a>
                    </Link> : <span className='media-header__sub-title'>{subTitle}</span>
                }
              </React.Fragment>
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
