import * as React from 'react'
import Link from 'next/link'
import { getLinkEpisodeHref, getLinkEpisodeAs, getLinkPodcastHref, getLinkPodcastAs
  } from 'lib/constants'
import { readableDate } from 'lib/utility'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'

type Props = {
  episode?: any
  handleToggleSubscribe?: any
  isSubscribed?: boolean
  isSubscribing?: boolean
  mediaRef?: any
  nowPlayingItem?: any
  podcast?: any
  subscribedIds?: any[]
}

export const MediaHeader: React.StatelessComponent<Props> = props => {
  const { episode, handleToggleSubscribe, isSubscribed, isSubscribing, mediaRef,
    nowPlayingItem, podcast } = props

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
    const { episodeId, episodePubDate, episodeTitle, podcastId, podcastImageUrl,
      podcastTitle } = mediaRef

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
    console.log('podcast')
  }

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
      <img className='media-header__image' src={imgUrl} />
      <div className='text-wrapper'>
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
        {
          title &&
            <Link
              {...(titleHref ? { href: titleHref } : {})}
              {...(titleAs ? { as: titleAs } : {})}>
              <a className='media-header__title'>{title}</a>
            </Link>
        }
        {
          parsedSubTitle &&
            <Link
              {...(subTitleHref ? { href: subTitleHref } : {})}
              {...(subTitleAs ? { as: subTitleAs } : {})}>
              <a className='media-header__sub-title'>{parsedSubTitle}</a>
            </Link>
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
