import * as React from 'react'
import * as Modal from 'react-modal'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
import { NowPlayingItem } from 'lib/nowPlayingItem'

export interface Props {
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  nowPlayingItem: NowPlayingItem
}

export const AddToModal: React.StatelessComponent<Props> = props => {
  const { hideModal, nowPlayingItem, isOpen } = props

  return (
    <Modal
      contentLabel='Add To'
      isOpen={isOpen}
      onRequestClose={hideModal}
      portalClassName='mp-add-to-modal'
      shouldCloseOnOverlayClick>
      <h4>
        Add To
      </h4>
      <CloseButton onClick={hideModal} />
      <MediaListItem
        dataNowPlayingItem={nowPlayingItem}
        itemType='now-playing-item'
        noWrap={true} />
    </Modal>
  )
}
