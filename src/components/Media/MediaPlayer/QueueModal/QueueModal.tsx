import * as React from 'react'
import * as Modal from 'react-modal'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'

export interface Props {
  handleOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  primaryItems: any
  secondaryItems: any
}

const customStyles = {
  content: {
    bottom: 'unset',
    height: 'calc(100% - 72px)',
    left: '50%',
    maxWidth: '480px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

export const QueueModal: React.StatelessComponent<Props> = props => {
  const { handleOnClick, hideModal, isOpen, primaryItems, secondaryItems } = props

  const primaryItemNodes = primaryItems.map(x => {
    if (x.clipStartTime) {
      return (
        <MediaListItem
          dataNowPlayingItem={x}
          handleOnClick={handleOnClick}
          itemType='now-playing-item' />
      )
    } else {
      return (
        <MediaListItem
          dataNowPlayingItem={x}
          handleOnClick={handleOnClick}
          itemType='now-playing-item' />
      )
    }
  })

  const secondaryItemNodes = secondaryItems.map(x => {
    if (x.clipStartTime) {
      return (
        <MediaListItem
          dataNowPlayingItem={x}
          handleOnClick={handleOnClick}
          itemType='now-playing-item' />
      )
    } else {
      return (
        <MediaListItem
          dataNowPlayingItem={x}
          handleOnClick={handleOnClick}
          itemType='now-playing-item' />
      )
    }
  })

  return (
    <Modal
      contentLabel='Queue'
      isOpen={isOpen}
      onRequestClose={hideModal}
      portalClassName='mp-queue-modal over-media-player'
      shouldCloseOnOverlayClick
      style={customStyles}>
      <h5>Queue</h5>
      <CloseButton onClick={hideModal} />
      <div className='scrollable-area'>
        <h6>Next Up</h6>
        {primaryItemNodes}
        <h6>Autoplay</h6>
        {secondaryItemNodes}
      </div>
    </Modal>
  )
}
