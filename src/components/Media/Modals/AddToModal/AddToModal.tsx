import * as React from 'react'
import * as Modal from 'react-modal'
import { convertToNowPlayingItem } from 'podverse-shared'
import { FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
import { checkIfLoadingOnFrontEnd } from 'lib/utility'
const uuidv4 = require('uuid/v4')

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
  handlePlaylistItemAdd?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleToggleCreatePlaylist?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isAddedToPlayLast?: boolean
  isAddedToPlayNext?: boolean
  isAddingToPlayLast?: boolean
  isAddingToPlayNext?: boolean
  isOpen: boolean
  loadingItemId?: string
  mediaRef?: any
  nowPlayingItem?: any
  playlists: any[]
  showPlaylists?: boolean
  showQueue?: boolean
  t?: any
}

const defaultProps: Props = {
  isOpen: false,
  nowPlayingItem: {},
  playlists: []
}

const customStyles = {
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
    handlePlaylistItemAdd, handleToggleCreatePlaylist, isAddedToPlayLast,
    isAddedToPlayNext, isAddingToPlayLast, isAddingToPlayNext, isOpen, loadingItemId,
    mediaRef, nowPlayingItem, playlists, showPlaylists, showQueue, t } = props

  const playlistMediaListItems = playlists.map(x =>
    <MediaListItem
      dataPlaylist={x}
      handleLinkClick={handlePlaylistItemAdd}
      itemType='playlist'
      key={uuidv4()}
      loadingItemId={loadingItemId}
      t={t} />
  )

  if (!showPlaylists && showQueue) {
    customStyles.content.maxHeight = '370px'
  } else if (!showPlaylists) {
    customStyles.content.maxHeight = '304px'
  }

  let playingItem

  if (episode) {
    playingItem = convertToNowPlayingItem(episode, null, null)
  } else if (mediaRef) {
    playingItem = convertToNowPlayingItem(mediaRef, null, null)
  } else if (nowPlayingItem) {
    playingItem = nowPlayingItem
  }

  let appEl
  if (checkIfLoadingOnFrontEnd()) {
    appEl = document.querySelector('body')
  }

  return (
    <Modal
      appElement={appEl}
      contentLabel={t('Add To')}
      isOpen={isOpen}
      onRequestClose={handleHideModal}
      portalClassName='add-to-modal over-media-player'
      shouldCloseOnOverlayClick
      style={customStyles}>
      <h3><FontAwesomeIcon icon='plus' /> &nbsp; {t('Add To')}</h3>
      <CloseButton onClick={handleHideModal} />
      <div className='scrollable-area reduced-margin'>
        {
          playingItem &&
            <MediaListItem
              dataNowPlayingItem={playingItem}
              hasLink
              hideDescription={true}
              hideDivider={true}
              itemType='now-playing-item'
              t={t} />
        }
        {
          showQueue &&
            <React.Fragment>
              <h6>
                {t('Queue')}
              </h6>
              <a
                className='add-to-modal__play-next'
                tabIndex={0}
                onClick={handleAddToQueueNext}>
                {
                  isAddingToPlayNext &&
                    <React.Fragment>
                      <FontAwesomeIcon icon='spinner' spin />
                    </React.Fragment>
                }
                {
                  isAddedToPlayNext &&
                    <React.Fragment>
                      {t('Added')}
                    </React.Fragment>
                }
                {
                  (!isAddedToPlayNext && !isAddingToPlayNext) &&
                    <React.Fragment>
                      <FontAwesomeIcon icon='level-up-alt' /> {t('Play Next')}
                    </React.Fragment>
                }
              </a>
              <a
                className='add-to-modal__play-last'
                onClick={handleAddToQueueLast}
                tabIndex={0}>
                {
                  isAddingToPlayLast &&
                  <React.Fragment>
                    <FontAwesomeIcon icon='spinner' spin />
                  </React.Fragment>
                }
                {
                  isAddedToPlayLast &&
                  <React.Fragment>
                    {t('Added')}
                  </React.Fragment>
                }
                {
                  (!isAddedToPlayLast && !isAddingToPlayLast) &&
                  <React.Fragment>
                    <FontAwesomeIcon icon='level-down-alt' /> {t('Play Last')}
                  </React.Fragment>
                }
              </a>
            </React.Fragment>
        }
        {
          showPlaylists ?
            <React.Fragment>
              <h6>
                {t('Playlists')}
              </h6>
              <div className='add-to-modal__create-playlist'>
                {
                  !createPlaylistShow ?
                    <button
                      className='add-to-modal-create-playlist__create'
                      onClick={handleToggleCreatePlaylist}>
                      <FontAwesomeIcon icon='plus' /> &nbsp;{t('Create Playlist')}
                    </button> :
                    <FormGroup>
                      <InputGroup>
                        <Input
                          innerRef={el => inputTitle = el}
                          name='add-to-modal-create-playlist__title'
                          onKeyPress={event => {
                            if (event.key === 'Enter' && handleCreatePlaylistSave) {
                              event.preventDefault()
                              handleCreatePlaylistSave(inputTitle.value)
                            }
                          }}
                          placeholder='title of playlist'
                          type='text' />
                        <InputGroupAddon addonType='append'>
                          <Button
                            className='add-to-modal-create-playlist__cancel'
                            color='secondary'
                            isOnlyIcon
                            onClick={handleCreatePlaylistHide}>
                            <FontAwesomeIcon icon='times' />
                          </Button>
                        </InputGroupAddon>
                        <InputGroupAddon addonType='append'>
                          <Button
                            className='add-to-modal-create-playlist__save'
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
                {t('Playlists')}
              </h6>
              <div className='add-to-modal__playlist-msg'>
                {t('LoginToAddItemsToPlaylists')}
              </div>
            </React.Fragment>
        }
      </div>
    </Modal>
  )
}

AddToModal.defaultProps = defaultProps

export { AddToModal }
