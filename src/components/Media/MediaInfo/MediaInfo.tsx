import * as React from 'react'
import { Button } from 'reactstrap'
import Link from 'next/link'
import { convertToNowPlayingItem } from 'podverse-shared'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { convertHHMMSSToAnchorTags, readableClipTime, readableDate } from 'lib/utility'
import { getLinkUserAs, getLinkUserHref, getLinkEpisodeAs, getLinkEpisodeHref } from 'lib/constants'
import { MoreDropdown } from 'components/MoreDropdown/MoreDropdown'
const linkifyHtml = require('linkifyjs/html')
const sanitizeHtml = require('sanitize-html')

type Props = {
  censorNSFWText?: boolean
  episode?: any
  handleAddToQueueLast?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleAddToQueueNext?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleAddToPlaylist?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePauseItem?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handlePlayItem?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleReplayClip?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleToggleEditClipModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleShare?: (event: React.MouseEvent<HTMLButtonElement>) => void
  i18n?: any
  initialShowDescription?: boolean
  isLoggedIn?: boolean
  isOfficialChapter?: boolean
  isOfficialSoundBite?: boolean
  loggedInUserId?: string
  mediaRef?: any
  nowPlayingItem?: any
  playing?: boolean
  playlists: any[]
  podcast?: any
  t?: any
  Trans?: any
}

type State = {
  showAddToModal: boolean
  showDescription: boolean
}

export class MediaInfo extends React.Component<Props, State> {

  static defaultProps: Props = {
    playlists: []
  }

  constructor (props) {
    super(props)

    this.state = {
      showAddToModal: false,
      showDescription: props.initialShowDescription || false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      setClipStartEventListeners()
      setTimeout(() => {
        this.forceUpdate()
      }, 500)
    }, 700)
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      (nextProps.episode && nextProps.episode.id) &&
      (this.props && this.props.episode && this.props.episode.id) &&
      nextProps.episode.id === this.props.episode.id
    ) {
      if (nextState.showDescription) {
        setTimeout(() => {
          setClipStartEventListeners()
        }, 700)
      }
    }
  }

  toggleDescription = () => {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription
    }), () => {
      if (this.state.showDescription) {
        setClipStartEventListeners()
      }
    })
  }

  render() {
    const { censorNSFWText = false, episode, handleAddToQueueLast, handleAddToQueueNext,
      handleAddToPlaylist, handleLinkClick, handlePauseItem, handlePlayItem, handleReplayClip,
      handleToggleEditClipModal, handleToggleShare, i18n, isOfficialChapter, isOfficialSoundBite,
      loggedInUserId, mediaRef, nowPlayingItem, playing, podcast, t, Trans } = this.props
    const { showDescription } = this.state

    let episodeTitle
    let episodeAs
    let episodeHref
    let episodePubDate
    let clipTitle
    let clipTime
    let createdById
    let createdByName
    let createdByIsPublic
    let moreInfo
    let currentItem: any = {}

    if (mediaRef) {
      episodeTitle = mediaRef.episode.title || t('untitledEpisode')
      episodeAs = getLinkEpisodeAs(mediaRef.episode.id)
      episodeHref = getLinkEpisodeHref(mediaRef.episode.id)
      episodePubDate = readableDate(mediaRef.episode.pubDate)
      clipTitle = mediaRef.title || t('untitledClip')
      clipTime = readableClipTime(mediaRef.startTime, mediaRef.endTime, t)
      createdById = mediaRef.owner ? mediaRef.owner.id : ''
      createdByIsPublic = mediaRef.owner ? mediaRef.owner.isPublic : false
      createdByName = mediaRef.owner && mediaRef.owner.name ? mediaRef.owner.name : t('Anonymous')
      moreInfo = mediaRef.episode.description
      currentItem = convertToNowPlayingItem(mediaRef, null, null)
    } else if (episode) {
      episodeTitle = episode.title
      episodeAs = getLinkEpisodeAs(episode.id)
      episodeHref = getLinkEpisodeHref(episode.id)
      episodePubDate = readableDate(episode.pubDate)
      moreInfo = episode.description
      currentItem = convertToNowPlayingItem(episode, null, null)
    } else if (nowPlayingItem) {
      episodeTitle = nowPlayingItem.episodeTitle
      episodeAs = getLinkEpisodeAs(nowPlayingItem.episodeId)
      episodeHref = getLinkEpisodeHref(nowPlayingItem.episodeId)
      episodePubDate = readableDate(episodePubDate)
      clipTitle = nowPlayingItem.clipTitle
      clipTime = readableClipTime(nowPlayingItem.clipStartTime, nowPlayingItem.clipEndTime, t)
      createdById = nowPlayingItem.ownerId
      createdByIsPublic = nowPlayingItem.ownerIsPublic
      createdByName = (mediaRef.owner && mediaRef.owner.name) || t('Anonymous')
      moreInfo = nowPlayingItem.episodeDescription
      currentItem = nowPlayingItem
    } else if (podcast) {
      moreInfo = podcast.description
    }
    if (moreInfo) {
      moreInfo = linkifyHtml(moreInfo)
      moreInfo = convertHHMMSSToAnchorTags(moreInfo)
      moreInfo = moreInfo.sanitize(censorNSFWText)
    }

    const sanitizedDescription = sanitizeHtml(moreInfo, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        'a': ['data-start-time', 'href', 'rel', 'target']
      },
      transformTags: {
        'a': sanitizeHtml.simpleTransform('a', {
          target: '_blank',
          rel: 'noopener noreferrer'
        })
      }
    })

    episodeTitle = episodeTitle ? episodeTitle.sanitize(censorNSFWText) : ''
    clipTitle = clipTitle ? clipTitle.sanitize(censorNSFWText) : ''
    createdByName = createdByName ? createdByName.sanitize(censorNSFWText) : ''

    const createdByNode = (
      <React.Fragment>
        {
          (!isOfficialChapter && !isOfficialSoundBite) &&
            <React.Fragment>
              {t('By')}:&nbsp;
              {
                createdByIsPublic ?
                  <Link
                    as={getLinkUserAs(createdById)}
                    href={getLinkUserHref(createdById)}>
                    <a onClick={handleLinkClick}>{createdByName}</a>
                  </Link> : createdByName
              }
            </React.Fragment>
        }
      </React.Fragment>
    )

    const DynamicAdsWarningLink = ({ children }) => (
      <Link
        as='/faq#why-do-some-clips-start-at-the-wrong-time'
        href='/faq#why-do-some-clips-start-at-the-wrong-time'>
        <a
          className='media-info__dynamic-ads-warning-link'
          onClick={handleLinkClick}>
          {children}
        </a>
      </Link>
    )

    return (
      <React.Fragment>
        <hr />
        <div className='media-info'>
          {
            episodeTitle &&
            <Link
              as={episodeAs}
              href={episodeHref}>
              <a
                className='media-info__episode-title'
                onClick={handleLinkClick}>
                {episodeTitle}
              </a>
            </Link>
          }
          {
            episodePubDate &&
              <div className='media-info__episode-pub-date'>
                {episodePubDate}
              </div>
          }
          {
            clipTitle &&
              <React.Fragment>
                <div className='media-info__clip-title'>
                  {clipTitle}
                </div>
              </React.Fragment>
          }
          {
            clipTime &&
              <div className='media-info__clip-time'>
                <a
                  className='media-info__replay-clip'
                  onClick={handleReplayClip}>
                  {clipTime}
                </a>
                <a 
                  className='media-info__replay-clip-button'
                  onClick={handleReplayClip}>
                  {
                    isOfficialChapter
                      ? 'Replay Chapter'
                      : 'Replay Clip'
                  }
                  <FontAwesomeIcon icon='redo' />
                </a>
              </div>
          }
          {
            currentItem.clipId &&
              <div className='media-info__clip-created-by'> {createdByNode}</div>
          }
          {
            (episode || mediaRef || nowPlayingItem) &&
              <div className='media-info__controls'>
                <Button
                  className={`media-info-controls__play ${playing ? 'playing' : ''}`}
                  onClick={event => {
                    if (handlePauseItem && handlePlayItem) {
                      if (playing) {
                        handlePauseItem(event)
                      } else {
                        handlePlayItem(event)
                      }
                    }
                  }}>
                  {
                    playing ?
                      <FontAwesomeIcon icon={'pause'} />
                      : <FontAwesomeIcon icon={'play'} />
                  }
                </Button>
                <MoreDropdown
                  direction='right'
                  handleAddToQueueLast={handleAddToQueueLast}
                  handleAddToQueueNext={handleAddToQueueNext}
                  handleToggleAddToPlaylist={handleAddToPlaylist}
                  handleToggleShare={handleToggleShare}
                  t={t} />
                {
                  (loggedInUserId
                    && currentItem.ownerId
                    && loggedInUserId === currentItem.ownerId) &&
                    <Button
                      className='media-info-controls__edit'
                      onClick={handleToggleEditClipModal}>
                      <FontAwesomeIcon icon='edit' />
                    </Button>
                }
              </div>
          }
          {
            (currentItem && currentItem.clipId && !currentItem.podcastHideDynamicAdsWarning) &&
              <div className='media-info__dynamic-ads-warning'>
                <Trans i18n={i18n} i18nKey='NoteDynamicAds'>
                  Note: If a podcast uses <DynamicAdsWarningLink>{t('dynamic ads')}</DynamicAdsWarningLink>, the clip start time may not stay accurate.
                </Trans>
              </div>
          }
          {
            ((episode || mediaRef || nowPlayingItem) && moreInfo) &&
              <button
                className='media-info__show-notes'
                onClick={this.toggleDescription}>
                <span>
                  <FontAwesomeIcon icon={showDescription ? 'caret-down' : 'caret-right'} />
                  &nbsp;{t('Episode Notes')}
                </span>
              </button>
          }
          {
            (moreInfo && showDescription) &&
              <article
                className='media-info__description'
                dangerouslySetInnerHTML={
                  {
                    __html: sanitizedDescription
                  }} />
          }
        </div>
      </React.Fragment>
    )
  }
}

const eventListenerElements = [] as any
const removeClipStartEventListeners = () => {
  if (eventListenerElements.length > 0) {
    for (const eventListenerElement of eventListenerElements) {
      eventListenerElement.removeEventListener('click', setClipStartEventListeners)
    }
  }
}

const setClipStartEventListeners = () => {
  removeClipStartEventListeners()
  const elements = document.querySelectorAll('[data-start-time]')
  for (let i = 0; i < elements.length; i++) {
    let startTime = elements[i].getAttribute('data-start-time') as any
    elements[i].addEventListener('click', () => {
      if (startTime) {
        startTime = parseInt(startTime, 10)
        if (startTime || startTime === 0 && window && window.player) {
          window.player.seekTo(startTime)
        }
      }
    })
    eventListenerElements.push(elements[i])
  }
}
