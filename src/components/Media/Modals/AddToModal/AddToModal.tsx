import * as React from 'react'
import * as Modal from 'react-modal'
import { FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
import { convertToNowPlayingItem } from 'lib/nowPlayingItem'

export interface Props {
  createPlaylistIsSaving?: boolean
  createPlaylistError?: string
  createPlaylistShow?: boolean
  episode?: any
  handleAddToQueueLast?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleAddToQueueNext?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleCreatePlaylistHide?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleCreatePlaylistSave?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleLoginClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePlaylistItemAdd?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleToggleCreatePlaylist?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  mediaRef?: any
  nowPlayingItem?: any
  playlists: any[]
  showPlaylists?: boolean
  showQueue?: boolean
}

const defaultProps: Props = {
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

let inputTitle

const AddToModal: React.StatelessComponent<Props> = props => {
  const { createPlaylistError, createPlaylistIsSaving, createPlaylistShow, episode, handleAddToQueueLast,
    handleAddToQueueNext, handleCreatePlaylistHide, handleCreatePlaylistSave, handleHideModal,
    handleLoginClick, handlePlaylistItemAdd, handleToggleCreatePlaylist, isOpen, mediaRef,
    nowPlayingItem, playlists, showPlaylists, showQueue } = props

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
    playingItem = nowPlayingItem
  }

  let appEl
  // @ts-ignore
  if (process.browser) {
    appEl = document.querySelector('body')
  }

  return (
    <Modal
      appElement={appEl}
      contentLabel='Add To'
      isOpen={isOpen}
      onRequestClose={handleHideModal}
      portalClassName='mp-add-to-modal over-media-player'
      shouldCloseOnOverlayClick
      style={customStyles}>
      <h4><FontAwesomeIcon icon='plus-circle' /> &nbsp; Add To</h4>
      <CloseButton onClick={handleHideModal} />
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
                My Playlists
              </h6>
              <div className='mp-add-to-modal__create-playlist'>
                {
                  !createPlaylistShow ?
                    <button
                      className='mp-add-to-modal-create-playlist__create'
                      onClick={handleToggleCreatePlaylist}>
                      <FontAwesomeIcon icon='plus' /> &nbsp;Create Playlist
                    </button> :
                    <FormGroup>
                      <InputGroup>
                        <Input
                          innerRef={el => inputTitle = el}
                          name='mp-add-to-modal-create-playlist__title'
                          placeholder='title of playlist'
                          type='text' />
                        <InputGroupAddon addonType='append'>
                          <Button
                            className='mp-add-to-modal-create-playlist__cancel'
                            color='secondary'
                            isOnlyIcon
                            onClick={handleCreatePlaylistHide}>
                            <FontAwesomeIcon icon='times' />
                          </Button>
                        </InputGroupAddon>
                        <InputGroupAddon addonType='append'>
                          <Button
                            className='mp-add-to-modal-create-playlist__save'
                            color='primary'
                            disabled={createPlaylistIsSaving}
                            isLoading={createPlaylistIsSaving}
                            isOnlyIcon
                            onClick={() => handleCreatePlaylistSave &&
                              handleCreatePlaylistSave(inputTitle.value)}>
                            <FontAwesomeIcon icon='check' />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                      {
                        createPlaylistError &&
                        <FormFeedback invalid='true'>
                          {createPlaylistError}
                        </FormFeedback>
                      }
                    </FormGroup>
                }
              </div>
              {playlistMediaListItems}
            </React.Fragment>
            :
            <React.Fragment>
              <h6>
                My Playlists
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

export { AddToModal }
