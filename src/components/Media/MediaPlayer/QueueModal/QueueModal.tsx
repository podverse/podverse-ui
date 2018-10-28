import * as React from 'react'
import * as Modal from 'react-modal'

export interface Props {
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '420px',
    overflow: 'unset',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

export const QueueModal: React.StatelessComponent<Props> = props => {
  const { hideModal, isOpen } = props

  return (
    <Modal
      contentLabel='Queue'
      isOpen={isOpen}
      onRequestClose={hideModal}
      portalClassName='mp-queue-modal over-media-player'
      shouldCloseOnOverlayClick
      style={customStyles}>
      Queue modal :)
      <button onClick={hideModal}>
        Hide modal
      </button>
    </Modal>
  )
}
