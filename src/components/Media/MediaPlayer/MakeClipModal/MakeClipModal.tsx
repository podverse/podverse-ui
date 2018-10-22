import * as React from 'react'
import * as Modal from 'react-modal'

export interface Props {
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
}

export const MakeClipModal: React.StatelessComponent<Props> = props => {
  const { hideModal, isOpen } = props

  return (
    <Modal
      contentLabel='Make Clip'
      isOpen={isOpen}>
      Make clip modal :)
      <button onClick={hideModal}>
        Hide modal
      </button>
    </Modal>
  )
}
