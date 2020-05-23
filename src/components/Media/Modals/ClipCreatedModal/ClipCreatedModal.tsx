import * as React from 'react'
import * as Modal from 'react-modal'
import { Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { checkIfLoadingOnFrontEnd } from 'lib/utility'
const ClipboardJS = require('clipboard')

type Props = {
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen?: boolean
  linkHref?: string
}

type State = {
  wasCopied?: boolean
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '420px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

class ClipCreatedModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      wasCopied: undefined
    }
  }

  componentDidMount() {
    new ClipboardJS('#clip-created-copy-link .btn')
  }

  _copyLink = () => {
    this.setState({ wasCopied: true })
    setTimeout(() => {
      this.setState({ wasCopied: false })
    }, 3000)
  }

  render () {
    const { handleHideModal, isOpen, linkHref } = this.props
    const { wasCopied } = this.state

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
      appEl = document.querySelector('body')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel='Share Clip'
        isOpen={isOpen}
        onRequestClose={handleHideModal}
        portalClassName='make-clip-share-modal'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <h3><FontAwesomeIcon icon='share' /> &nbsp;Share Clip</h3>
        <CloseButton onClick={handleHideModal} />
        <Form>
          <FormGroup>
            <Label for='clip-created-copy-link'>Clip</Label>
            <InputGroup id='clip-created-copy-link'>
              <Input
                id='clip-created-copy-link-input'
                readOnly={true}
                value={linkHref} />
              <InputGroupAddon
                addonType='append'>
                <Button
                  color='primary'
                  dataclipboardtarget='#clip-created-copy-link-input'
                  onClick={this._copyLink}
                  text={wasCopied ? 'Copied!' : 'Copy'} />
              </InputGroupAddon>
            </InputGroup>
            <FormText>
              Copy this link to share your clip with anyone.
            </FormText>
          </FormGroup>
        </Form>
      </Modal>
    )
  }
}

export { ClipCreatedModal }
