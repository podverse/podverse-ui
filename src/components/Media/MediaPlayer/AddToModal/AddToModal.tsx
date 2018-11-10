import * as React from 'react'
import * as Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
import { NowPlayingItem } from 'lib/nowPlayingItem'

export interface Props {
  handleAddToQueuePlayLast?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleAddToQueuePlayNext?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePlaylistItemAdd?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  nowPlayingItem: NowPlayingItem
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

const customStyles = {
  content: {
    bottom: 'unset',
    height: 'calc(100% - 72px)',
    left: '50%',
    maxWidth: '420px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

const AddToModal: React.StatelessComponent<Props> = props => {
  const { handleAddToQueuePlayLast, handleAddToQueuePlayNext, handlePlaylistItemAdd,
    hideModal, isOpen, nowPlayingItem, playlists, showPlaylists, showQueue } = props

  const playlistMediaListItems = playlists.map(x =>
    <MediaListItem
      dataPlaylist={x}
      handleAnchorOnClick={handlePlaylistItemAdd}
      itemType='playlist'
      noWrap={true} />
  )

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
        <MediaListItem
          dataNowPlayingItem={nowPlayingItem}
          itemType='now-playing-item'
          noWrap={true} />
        {
          showQueue &&
            <React.Fragment>
              <h6>
                  Queue
              </h6>
                <a
                  className='mp-add-to-modal__play-next'
                  onClick={handleAddToQueuePlayNext}
                  href='#'>
                  <FontAwesomeIcon icon='play' /> Play Next
              </a>
                <a
                  className='mp-add-to-modal__play-last'
                  onClick={handleAddToQueuePlayLast}
                  href='#'>
                  <FontAwesomeIcon icon='play' /> Play Last
              </a>
            </React.Fragment>
        }
        {
          showPlaylists &&
            <React.Fragment>
              <h6>
                Playlist
              </h6>
              {playlistMediaListItems}
            </React.Fragment>
        }
      </div>
    </Modal>
  )
}

AddToModal.defaultProps = defaultProps

export default AddToModal
