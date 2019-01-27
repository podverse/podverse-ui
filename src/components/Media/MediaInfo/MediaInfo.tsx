import * as React from 'react'
import { Button } from 'reactstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { calcDuration, readableClipTime, secondsToReadableDuration } from 'lib/utility'
import { convertToNowPlayingItem } from 'lib/nowPlayingItem'
import { getLinkUserAs, getLinkUserHref } from 'lib/constants'
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
      showDescription: false
    }

    this.toggleDescription = this.toggleDescription.bind(this)
  }

  toggleDescription () {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription
    }))
  }

  render () {
    const {episode, handleLinkClick, handlePauseItem, handlePlayItem, loggedInUserId,
      mediaRef, nowPlayingItem, playing, podcast, handleToggleAddToModal,
      handleToggleMakeClipModal } = this.props
    const { showDescription } = this.state

    let title
    let time
    let duration
    let createdById
    let createdByName
    let createdByIsPublic
    let description
    let currentItem: any = {}

    if (episode) {
      title = episode.title
      time = 'Full Episode'
      duration = ''
      description = episode.description
      currentItem = convertToNowPlayingItem(episode)
    } else if (mediaRef) {
      title = mediaRef.title || 'Untitled clip'
      time = readableClipTime(mediaRef.startTime, mediaRef.endTime)
      duration = secondsToReadableDuration(
        calcDuration(mediaRef.startTime, mediaRef.endTime)
      )
      createdById = mediaRef.owner.id
      createdByIsPublic = mediaRef.owner.isPublic
      createdByName = mediaRef.owner.name || 'anonymous'
      description = mediaRef.episodeDescription
      currentItem = convertToNowPlayingItem(mediaRef)
    } else if (nowPlayingItem) {
      title = nowPlayingItem.clipTitle
      time = readableClipTime(nowPlayingItem.clipStartTime, nowPlayingItem.clipEndTime)
      duration = secondsToReadableDuration(
        calcDuration(nowPlayingItem.clipStartTime, nowPlayingItem.clipEndTime)
      )
      createdById = nowPlayingItem.ownerId
      createdByIsPublic = nowPlayingItem.ownerIsPublic
      createdByName = mediaRef.owner.name || 'anonymous'
      description = nowPlayingItem.episodeDescription
      currentItem = nowPlayingItem
    } else if (podcast) {
      title = ''
      time = ''
      duration = ''
      createdById = ''
      createdByIsPublic = ''
      createdByName = ''
      description = podcast.description
      currentItem = null
    }

    return (
      <React.Fragment>
        <div className='media-info'>
          {
            title &&
            <div className='media-info__title'>
              {title}
            </div>
          }
          {
            duration &&
            <div className='media-info__duration'>
              {duration}
            </div>
          }
          {
            time &&
            <div className='media-info__time'>
              {time}
            </div>
          }
          {
            createdById &&
            <div className='media-info__created-by'>
              Clip by:&nbsp;
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
            ((episode || mediaRef || nowPlayingItem) && description) &&
              <button
                className='media-info__show-more'
                onClick={this.toggleDescription}>
                {this.state.showDescription ?
                  <React.Fragment>
                    <div><FontAwesomeIcon icon='caret-down' /></div>&nbsp;More Info
                  </React.Fragment> :
                  <React.Fragment>
                    <div><FontAwesomeIcon icon='caret-right' /></div>&nbsp;More Info
                  </React.Fragment>
                }
              </button>
          }
          {
            (podcast || (description && showDescription)) &&
              <div
                className='media-info__description'
                dangerouslySetInnerHTML={
                  {
                    __html: sanitizeHtml(description, {
                      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
                    })
                  }} />
          }
        </div>
      </React.Fragment>
    )
  }
}
