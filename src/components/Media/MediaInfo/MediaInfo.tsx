import * as React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { calcDuration, readableClipTime, secondsToReadableDuration } from 'lib/utility'
import { convertToNowPlayingItem } from 'lib/nowPlayingItem';
const sanitizeHtml = require('sanitize-html')

type Props = {
  episode?: any
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
    const { episode, handlePlayItem, loggedInUserId, mediaRef, nowPlayingItem,
      playing, podcast, handleToggleAddToModal, handleToggleMakeClipModal } = this.props
    const { showDescription } = this.state

    let title
    let time
    let duration
    let description
    let currentItem: any = {}

    if (episode) {
      console.log('episode')
    } else if (mediaRef) {
      title = mediaRef.title || 'Untitled clip'
      time = readableClipTime(mediaRef.startTime, mediaRef.endTime)
      duration = secondsToReadableDuration(
        calcDuration(mediaRef.startTime, mediaRef.endTime)
      )
      description = mediaRef.episodeDescription
      currentItem = convertToNowPlayingItem(mediaRef)
    } else if (nowPlayingItem) {
      title = nowPlayingItem.clipTitle
      time = readableClipTime(nowPlayingItem.clipStartTime, nowPlayingItem.clipEndTime)
      duration = secondsToReadableDuration(
        calcDuration(nowPlayingItem.clipStartTime, nowPlayingItem.clipEndTime)
      )
      description = nowPlayingItem.episodeDescription
      currentItem = nowPlayingItem
    } else if (podcast) {
      console.log('podcast')
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
          <div className='media-info__controls'>
            <Button
              className={`media-info-controls__play ${playing ? 'playing' : ''}`}
              onClick={handlePlayItem}>
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
          {
            description &&
              <button
                className='media-info__show-more'
                onClick={this.toggleDescription}>
                {this.state.showDescription ? 'Hide Notes' : 'Show Notes'}
              </button>
          }
          {
            (description && showDescription) &&
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
