import * as React from 'react'
import * as Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'


export interface Props {
  handleAnchorOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  nowPlayingItem?: any
  priorityItems: any[]
  secondaryItems: any[]
}

const defaultProps: Props = {
  hideModal: () => { console.log('hideModal') },
  isOpen: false,
  nowPlayingItem: {},
  priorityItems: [],
  secondaryItems: []
}

const customStyles = {
  content: {
    bottom: 'unset',
    height: 'calc(100% - 72px)',
    left: '50%',
    maxWidth: '480px',
    padding: '1.5rem',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

const QueueModal: React.StatelessComponent<Props> = props => {
  const { handleAnchorOnClick, hideModal, isOpen, nowPlayingItem, priorityItems, 
    secondaryItems } = props

  const priorityItemNodes = priorityItems.map(x => {
    if (x.clipStartTime) {
      return (
        <MediaListItem
          dataNowPlayingItem={x}
          handleAnchorOnClick={handleAnchorOnClick}
          itemType='now-playing-item' />
      )
    } else {
      return (
        <MediaListItem
          dataNowPlayingItem={x}
          handleAnchorOnClick={handleAnchorOnClick}
          itemType='now-playing-item' />
      )
    }
  })

  const secondaryItemNodes = secondaryItems.map(x => {
    if (x.clipStartTime) {
      return (
        <MediaListItem
          dataNowPlayingItem={x}
          handleAnchorOnClick={handleAnchorOnClick}
          itemType='now-playing-item' />
      )
    } else {
      return (
        <MediaListItem
          dataNowPlayingItem={x}
          handleAnchorOnClick={handleAnchorOnClick}
          itemType='now-playing-item' />
      )
    }
  })

  let appEl
  // @ts-ignore
  if (process.browser) {
    appEl = document.querySelector('body')
  }

  const isClip = nowPlayingItem.clipId ? true : false
  const itemType = isClip ? 'now-playing-item-queue-clip' : 'now-playing-item-queue-episode'

  return (
    <Modal
      appElement={appEl}
      contentLabel='Queue'
      isOpen={isOpen}
      onRequestClose={hideModal}
      portalClassName='mp-queue-modal over-media-player'
      shouldCloseOnOverlayClick
      style={customStyles}>
      <h4><FontAwesomeIcon icon='list-ul' /> &nbsp;Queue</h4>
      <CloseButton onClick={hideModal} />
      <div className='scrollable-area'>
        {
          nowPlayingItem &&
          <React.Fragment>
            <h6>Now Playing</h6>
            <MediaListItem
              dataNowPlayingItem={nowPlayingItem}
              itemType={itemType}
              noWrap={true} />
          </React.Fragment>
        }
        {
          priorityItemNodes.length > 0 &&
            <React.Fragment>
              <h6>Next Up</h6>
              {priorityItemNodes}
            </React.Fragment>
        }
        {
          secondaryItemNodes.length > 0 &&
            <React.Fragment>
              <h6>Auto Queue</h6>
              {secondaryItemNodes}
            </React.Fragment>
        }
      </div>
    </Modal>
  )
}

QueueModal.defaultProps = defaultProps

export default QueueModal
