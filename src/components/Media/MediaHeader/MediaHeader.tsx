import * as React from 'react'
import Link from 'next/link'
import { convertToNowPlayingItem } from 'podverse-shared'
import { Pill } from 'components/Pill/Pill'
import { PVImage } from 'components/PVImage/PVImage'
import { getLinkPodcastHref, getLinkPodcastAs, getLinkCategoryHref,
  getLinkCategoryAs } from 'lib/constants'
import { getIsAuthorityFeedUrl } from 'lib/utility'
const uuidv4 = require('uuid/v4')

type Props = {
  censorNSFWText?: boolean
  episode?: any
  handleLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleToggleSubscribe?: any
  handleToggleSupport?: any 
  isSubscribed?: boolean
  isSubscribing?: boolean
  mediaRef?: any
  modalsSupportShow?: any
  nowPlayingItem?: any
  podcast?: any
  t: any
}

const generateAuthorText = authors => {
  let authorText = ''
  if (authors && authors.length > 0) {
    for (let i = 0; i < authors.length; i++) {
      const author = authors[i]
      authorText += `${author.name}${i < authors.length - 1 ? ', ' : ''}`
    }
  }

  return authorText
}

const generateCategoryNodes = (categories, handleLinkClick) => {
  const categoryNodes: any[] = []
  
  if (categories && categories.length > 0) {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      const categoryText = category.title
      const categoryAs = getLinkCategoryAs(category.id)
      const categoryHref = getLinkCategoryHref(category.id)
  
      categoryNodes.push(
        <React.Fragment key={uuidv4()}>
          <Link
            href={categoryHref}
            as={categoryAs}
            key={uuidv4()}>
            <a
              key={uuidv4()}
              onClick={handleLinkClick}>{categoryText}</a>
          </Link>
          {i < categories.length - 1 && (<span>,</span>)}
        </React.Fragment>
      )
    }
  }

  return categoryNodes
}

export const MediaHeader: React.StatelessComponent<Props> = props => {
  const { censorNSFWText = false, episode, handleLinkClick, handleToggleSubscribe,
    handleToggleSupport, isSubscribed, isSubscribing, mediaRef, podcast, t } = props

  let bottomText
  let imgUrl
  let subTitle
  let title
  let titleAs
  let titleHref
  let feedUrl
  let episodeFunding
  let podcastFunding
  // let podcastValue

  if (mediaRef) {
    const item = convertToNowPlayingItem(mediaRef, null, null)
    const { podcastShrunkImageUrl, podcastId, podcastTitle } = item
    imgUrl = (mediaRef.episode && mediaRef.episode.shrunkImageUrl)
      || (mediaRef.episode && mediaRef.episode.imageUrl)
      || podcastShrunkImageUrl
    title = podcastTitle
    titleAs = getLinkPodcastAs(podcastId)
    titleHref = getLinkPodcastHref(podcastId)
    subTitle = generateAuthorText(mediaRef.episode.podcast.authors)
    bottomText = generateCategoryNodes(mediaRef.episode.podcast.categories, handleLinkClick)
    if (mediaRef && mediaRef.episode && mediaRef.episode.podcast) {
      if (mediaRef.episode.podcast.feedUrls) {
        feedUrl = getIsAuthorityFeedUrl(mediaRef.episode.podcast.feedUrls)
      }
      episodeFunding = mediaRef.episode.funding
      podcastFunding = mediaRef.episode.podcast.funding
      // podcastValue = mediaRef.episode.podcast.value
    }
  } else if (episode && episode.podcast) {
    imgUrl = episode.shrunkImageUrl
      || episode.imageUrl
      || episode.podcast.shrunkImageUrl
      || episode.podcast.imageUrl
    title = episode.podcast.title
    titleAs = getLinkPodcastAs(episode.podcast.id)
    titleHref = getLinkPodcastHref(episode.podcast.id)
    subTitle = generateAuthorText(episode.podcast.authors)
    bottomText = generateCategoryNodes(episode.podcast.categories, handleLinkClick)
    feedUrl = getIsAuthorityFeedUrl(episode.podcast.feedUrls)
    episodeFunding = episode.funding
    podcastFunding = episode.podcast.funding
    // podcastValue = episode.podcast.value
  } else if (podcast) {
    subTitle = generateAuthorText(podcast.authors)
    bottomText = generateCategoryNodes(podcast.categories, handleLinkClick)
    imgUrl = podcast.shrunkImageUrl || podcast.imageUrl
    title = podcast.title
    if (podcast.feedUrls) {
      feedUrl = getIsAuthorityFeedUrl(podcast.feedUrls)
    }
    podcastFunding = podcast.funding
    // podcastValue = podcast.value
  }

  title = title ? title.sanitize(censorNSFWText) : ''

  const mediaHeaderTopButton = (
    <Pill
      isActive={isSubscribed}
      isLoading={isSubscribing}
      onClick={handleToggleSubscribe}
      text={isSubscribed ? t('Subscribed') : t('Subscribe')}
      title={isSubscribed ? t('Subscribed') : t('Subscribe')} />
  )

  const showSupport = (episodeFunding && episodeFunding.length > 0) ||
    (podcastFunding && podcastFunding.length > 0)
  const mediaHeaderSupportButton = showSupport ? (
    <Pill
      colorWarning={true}
      fontWeight={300}
      icon='donate'
      noBorder={true}
      onClick={handleToggleSupport}
      text={t('Support')}
      title={t('Support')} />
  ) : null

  const mediaHeaderBottomButton = (
    <Pill
      fontWeight={300}
      href={feedUrl}
      icon='rss'
      noBorder={true}
      rel='noreferer'
      target='_blank'
      text={t('RSS')}
      title={t('RSS Feed Link')} />
  )

  return (
    <div className='media-header'>
      <div className='media-header__image-wrapper'>
        <PVImage
          height='6.75rem'
          imageUrl={imgUrl}
          width='6.75rem' />
      </div>
      <div className='text-wrapper'>
        <div className='media-header__top'>
          <React.Fragment>
            {
              titleHref ?
                <Link
                  href={titleHref}
                  as={titleAs}>
                  <a
                    className='media-header__title'
                    onClick={handleLinkClick}>{title}</a>
                </Link> : <span className='media-header__title'>{title || t('untitledPodcast')}</span>
            }
          </React.Fragment>
          <div className='media-header-top__buttons hide-on-mobile'>
            {mediaHeaderTopButton}
          </div>
        </div>
        <div className='media-header__middle'>
          <div className='media-header__sub-title'>
            {subTitle ? subTitle : <div>&nbsp;</div> }
          </div>
        </div>
        <div className='media-header__bottom'>
          {
            bottomText &&
              <div className='media-header__bottom-text'>{bottomText}</div>
          }
          <div className='media-header-bottom__buttons'>
            { showSupport && mediaHeaderSupportButton }
            { feedUrl && mediaHeaderBottomButton }
          </div>
        </div>
      </div>
      <div className='media-header__mobile-buttons'>
        {mediaHeaderTopButton}
        {mediaHeaderBottomButton}
        {showSupport && mediaHeaderSupportButton}
      </div>
    </div>
  )
}
