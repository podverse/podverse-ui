import * as React from 'react'
import * as Modal from 'react-modal'

export interface Props {
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
}

export const AddToModal: React.StatelessComponent<Props> = props => {
  const { hideModal, isOpen } = props

  return (
    <Modal
      contentLabel='Add To'
      isOpen={isOpen}>
      Add to modal :)
      <button onClick={hideModal}>
        Hide modal
      </button>
    </Modal>
  )
}
