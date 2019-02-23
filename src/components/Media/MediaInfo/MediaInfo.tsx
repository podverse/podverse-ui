import * as React from 'react'
import { Button } from 'reactstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { readableClipTime, readableDate } from 'lib/utility'
import { convertToNowPlayingItem } from 'lib/nowPlayingItem'
import { getLinkUserAs, getLinkUserHref, getLinkEpisodeAs, getLinkEpisodeHref } from 'lib/constants'
const sanitizeHtml = require('sanitize-html')

type Props = {
  episode?: any
  handleLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePauseItem?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handlePlayItem?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleAddToModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleMakeClipModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoggedIn?: boolean
  loggedInUserId?: string
  mediaRef?: any
  nowPlayingItem?: any
  playing?: boolean
  playlists: any[]
  podcast?: any
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
      showDescription: props.episode || (props.nowPlayingItem && !props.nowPlayingItem.clipId)
    }
  }

  toggleDescription = () => {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription
    }))
  }

  render () {
    const {episode, handleLinkClick, handlePauseItem, handlePlayItem, loggedInUserId,
      mediaRef, nowPlayingItem, playing, podcast, handleToggleAddToModal,
      handleToggleMakeClipModal } = this.props
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

    if (episode) {
      episodeTitle = episode.title
      episodeAs = getLinkEpisodeAs(episode.id)
      episodeHref = getLinkEpisodeHref(episode.id)
      episodePubDate = readableDate(episode.pubDate)
      moreInfo = episode.description
      currentItem = convertToNowPlayingItem(episode)
    } else if (mediaRef) {
      episodeTitle = mediaRef.episode.title || 'Untitled episode'
      episodeAs = getLinkEpisodeAs(mediaRef.episode.id)
      episodeHref = getLinkEpisodeHref(mediaRef.episode.id)
      episodePubDate = readableDate(mediaRef.episode.pubDate)
      clipTitle = mediaRef.title || 'Untitled clip'
      clipTime = readableClipTime(mediaRef.startTime, mediaRef.endTime)
      createdById = mediaRef.owner ? mediaRef.owner.id : ''
      createdByIsPublic = mediaRef.owner ? mediaRef.owner.isPublic : false
      createdByName = mediaRef.owner && mediaRef.owner.name ? mediaRef.owner.name : 'anonymous'
      moreInfo = mediaRef.episode.description
      currentItem = convertToNowPlayingItem(mediaRef)
    } else if (nowPlayingItem) {
      episodeTitle = nowPlayingItem.episodeTitle
      episodeAs = getLinkEpisodeAs(nowPlayingItem.episodeId)
      episodeHref = getLinkEpisodeHref(nowPlayingItem.episodeId)
      episodePubDate = readableDate(episodePubDate)
      clipTitle = nowPlayingItem.clipTitle
      clipTime = readableClipTime(nowPlayingItem.clipStartTime, nowPlayingItem.clipEndTime)
      createdById = nowPlayingItem.ownerId
      createdByIsPublic = nowPlayingItem.ownerIsPublic
      createdByName = (mediaRef.owner && mediaRef.owner.name) || 'anonymous'
      moreInfo = nowPlayingItem.episodeDescription
      currentItem = nowPlayingItem
    } else if (podcast) {
      moreInfo = podcast.description
    }

    return (
      <React.Fragment>
        <div className='media-info'>
          {
            episodeTitle &&
            <Link
              {...(episodeAs ? { as: episodeAs } : {})}
              {...(episodeHref ? { href: episodeHref } : {})}>
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
            <div className='media-info__clip-title'>
              Clip: {clipTitle}
            </div>
          }
          {
            clipTime &&
            <div className='media-info__clip-time'>
              {clipTime}
            </div>
          }
          {
            currentItem.clipId &&
            <div className='media-info__clip-created-by'>
              By:&nbsp;
              {
                createdByIsPublic ?
                  <Link
                    as={getLinkUserAs(createdById)}
                    href={getLinkUserHref(createdById)}>
                    <a onClick={handleLinkClick}>{createdByName}</a>
                  </Link> : createdByName
              }
            </div>
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
                <Button
                  className='media-info-controls__add-to'
                  onClick={handleToggleAddToModal}>
                  <FontAwesomeIcon icon='plus' />
                </Button>
                {
                  (loggedInUserId
                    && currentItem.ownerId
                    && loggedInUserId === currentItem.ownerId) &&
                    <Button
                      className='media-info-controls__edit'
                      onClick={handleToggleMakeClipModal}>
                      <FontAwesomeIcon icon='edit' />
                    </Button>
                }
              </div>
          }
          {
            ((episode || mediaRef || nowPlayingItem) && moreInfo) &&
              <button
                className='media-info__show-notes'
                onClick={this.toggleDescription}>
                <span>
                  <FontAwesomeIcon icon={showDescription ? 'caret-down' : 'caret-right'} />
                  &nbsp;Episode Info
                </span>
              </button>
          }
          {
            (podcast || (moreInfo && showDescription)) &&
              <div
                className='media-info__description'
                dangerouslySetInnerHTML={
                  {
                    __html: sanitizeHtml(moreInfo, {
                      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
                    })
                  }} />
          }
        </div>
      </React.Fragment>
    )
  }
}
