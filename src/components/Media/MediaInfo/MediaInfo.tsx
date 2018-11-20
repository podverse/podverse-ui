import * as React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { readableClipTime } from 'lib/utility'
import AddToModal from 'components/Media/Modals/AddToModal/AddToModal'
const sanitizeHtml = require('sanitize-html')

type Props = {
  episode?: any
  handleAddToPlaylist?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleAddToQueueLast?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleAddToQueueNext?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePlayItem?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleShowAddToModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoggedIn?: boolean
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

  hideAddToModal = () => {
    this.setState({ showAddToModal: false })
  }

  toggleModal = (key) => {
    this.setState({
      showAddToModal: key === 'addTo' ? !this.state.showAddToModal : false
    })
  }

  toggleAddToModal = () => {
    this.toggleModal('addTo')
  }

  toggleDescription () {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription
    }))
  }

  render () {
    const { episode, handleAddToPlaylist, handleAddToQueueLast, handleAddToQueueNext,
      handlePlayItem, isLoggedIn, mediaRef, nowPlayingItem, playing, podcast,
      playlists } = this.props
    const { showAddToModal, showDescription } = this.state

    let title
    let time
    let description

    if (episode) {
      console.log('episode')
    } else if (mediaRef) {
      title = mediaRef.title || 'Untitled clip'
      time = readableClipTime(mediaRef.startTime, mediaRef.endTime)
      description = mediaRef.episodeDescription
    } else if (nowPlayingItem) {
      title = nowPlayingItem.clipTitle
      time = readableClipTime(nowPlayingItem.clipStartTime, nowPlayingItem.clipEndTime)
      description = nowPlayingItem.episodeDescription
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
            time &&
            <div
              className='media-info__time'
              onClick={() => console.log('hello')}>
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
              onClick={this.toggleAddToModal}>
              <FontAwesomeIcon icon='plus' />
            </Button>
          </div>
          {
            description &&
              <div
                className='media-info__show-more'
                onClick={this.toggleDescription}>
                {this.state.showDescription ? 'Hide Notes' : 'Show Notes'}
              </div>
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
        <AddToModal
          episode={episode}
          handleAddToQueueLast={handleAddToQueueLast}
          handleAddToQueueNext={handleAddToQueueNext}
          handlePlaylistItemAdd={handleAddToPlaylist}
          hideModal={this.hideAddToModal}
          isOpen={showAddToModal}
          mediaRef={mediaRef}
          nowPlayingItem={nowPlayingItem}
          playlists={playlists}
          showPlaylists={isLoggedIn}
          showQueue={true} />
      </React.Fragment>
    )
  }
}
