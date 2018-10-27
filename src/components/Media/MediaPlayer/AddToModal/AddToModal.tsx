import * as React from 'react'
import * as Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
import { NowPlayingItem } from 'lib/nowPlayingItem'

export interface Props {
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  nowPlayingItem: NowPlayingItem
  playlists: any
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

export const AddToModal: React.StatelessComponent<Props> = props => {
  const { hideModal, isOpen, nowPlayingItem, playlists } = props

  const playlistMediaListItems = playlists.map(x =>
    <MediaListItem
      dataPlaylist={x}
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
      <h4>
        Add To
      </h4>
      <CloseButton onClick={hideModal} />
      <div className='scrollable-area'>
        <MediaListItem
          dataNowPlayingItem={nowPlayingItem}
          itemType='now-playing-item'
          noWrap={true} />
        <h5>
          Queue
        </h5>
        <div
          className='mp-add-to-modal__play-next'>
          <FontAwesomeIcon icon='play' /> Play Next
        </div>
        <div
          className='mp-add-to-modal__play-last'>
          <FontAwesomeIcon icon='play' /> Play Last
        </div>
        <h5>
          Playlist
        </h5>
        {playlistMediaListItems}
      </div>
    </Modal>
  )
}
