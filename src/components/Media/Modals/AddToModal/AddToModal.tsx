import * as React from 'react'
import * as Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
import { convertToNowPlayingItem } from 'lib/nowPlayingItem';

export interface Props {
  episode?: any
  handleAddToQueueLast?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleAddToQueueNext?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleLoginClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePlaylistItemAdd?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  mediaRef?: any
  nowPlayingItem?: any
  playlists: any[]
  showPlaylists?: boolean
  showQueue?: boolean
}

const defaultProps: Props = {
  hideModal: () => { console.log('hideModal') },
  isOpen: false,
  nowPlayingItem: {},
  playlists: []
}

let customStyles = {
  content: {
    bottom: 'unset',
    height: 'calc(100% - 72px)',
    left: '50%',
    maxHeight: 'none',
    maxWidth: '420px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

const AddToModal: React.StatelessComponent<Props> = props => {
  const { episode, handleAddToQueueLast, handleAddToQueueNext, handleLoginClick,
    handlePlaylistItemAdd, hideModal, isOpen, mediaRef, nowPlayingItem, playlists,
    showPlaylists, showQueue } = props

  const playlistMediaListItems = playlists.map(x =>
    <MediaListItem
      dataPlaylist={x}
      handleAnchorOnClick={handlePlaylistItemAdd}
      itemType='playlist'
      noWrap={true} />
  )

  if (!showPlaylists && showQueue) {
    customStyles.content.maxHeight = '350px'
  } else if (!showPlaylists) {
    customStyles.content.maxHeight = '280px'
  } else {
    customStyles.content.maxHeight = 'none'
  }

  let playingItem

  if (episode) {
    playingItem = convertToNowPlayingItem(episode)
  } else if (mediaRef) {
    playingItem = convertToNowPlayingItem(mediaRef)
  } else if (nowPlayingItem) {
    playingItem = convertToNowPlayingItem(nowPlayingItem)
  }

  return (
    <Modal
      contentLabel='Add To'
      isOpen={isOpen}
      onRequestClose={hideModal}
      portalClassName='mp-add-to-modal over-media-player'
      shouldCloseOnOverlayClick
      style={customStyles}>
      <h5>Add To</h5>
      <CloseButton onClick={hideModal} />
      <div className='scrollable-area'>
        {
          playingItem &&
            <MediaListItem
              dataNowPlayingItem={playingItem}
              itemType='now-playing-item'
              noWrap={true} />
        }
        {
          showQueue &&
            <React.Fragment>
              <h6>
                Queue
              </h6>
              <a
                className='mp-add-to-modal__play-next'
                onClick={handleAddToQueueNext}>
                <FontAwesomeIcon icon='level-up-alt' /> Play Next
              </a>
              <a
                className='mp-add-to-modal__play-last'
                onClick={handleAddToQueueLast}>
                <FontAwesomeIcon icon='level-down-alt' /> Play Last
              </a>
            </React.Fragment>
        }
        {
          showPlaylists ?
            <React.Fragment>
              <h6>
                Playlist
              </h6>
              {playlistMediaListItems}
            </React.Fragment>
            :
            <React.Fragment>
              <h6>
                Playlist
              </h6>
              <div className='mp-add-to-modal__playlist-msg'>
                <a onClick={handleLoginClick}>Login</a>
                &nbsp;to add items to playlists
              </div>
            </React.Fragment>

        }
      </div>
    </Modal>
  )
}

AddToModal.defaultProps = defaultProps

export default AddToModal
