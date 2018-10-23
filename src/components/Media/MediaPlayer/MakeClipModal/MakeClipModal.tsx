import * as React from 'react'
import * as Modal from 'react-modal'
import { CloseButton } from 'components/CloseButton/CloseButton'

type Props = {
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean,
  isPublic: boolean,
  startTime: number
}

type State = {
  endTime?: number,
  isPublic: boolean,
  startTime: number
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '600px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

class MakeClipModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      endTime: undefined,
      isPublic: props.isPublic,
      startTime: props.startTime
    }

  }

  render () {
    const { hideModal, isOpen } = this.props
    const { endTime, isPublic, startTime } = this.state

    return (
      <Modal
        contentLabel='Make clip'
        isOpen={isOpen}
        onRequestClose={hideModal}
        portalClassName='mp-share-modal'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <h4>
          Make Clip
        </h4>
        <CloseButton onClick={hideModal} />
        {endTime}
        {isPublic}
        {startTime}
      </Modal>
    )
  }
}

export default MakeClipModal
