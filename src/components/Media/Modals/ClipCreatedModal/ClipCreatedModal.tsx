import * as React from 'react'
import * as Modal from 'react-modal'
import { Form, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { copyToClipboard } from 'lib/utility'

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

  copyLink = () => {
    const { linkHref } = this.props
    copyToClipboard(linkHref)
    this.setState({ wasCopied: true })
    setTimeout(() => {
      this.setState({ wasCopied: false })
    }, 3000)
  }

  render () {
    const { handleHideModal, isOpen, linkHref } = this.props
    const { wasCopied } = this.state

    let appEl
    // @ts-ignore
    if (process.browser) {
      appEl = document.querySelector('body')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel='Make clip'
        isOpen={isOpen}
        onRequestClose={handleHideModal}
        portalClassName='make-clip-modal'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <h3><FontAwesomeIcon icon='share' /> &nbsp;Share Clip</h3>
        <CloseButton onClick={handleHideModal} />
        <Form>
          <FormGroup>
            <Label for='clip-created-copy-link'>Clip</Label>
            <InputGroup id='clip-created-copy-link'>
              <Input
                readOnly={true}
                value={linkHref} />
              <InputGroupAddon
                addonType='append'>
                <Button
                  color='primary'
                  onClick={this.copyLink}
                  text={wasCopied ? 'Copied!' : 'Copy'} />
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
      </Modal>
    )
  }
}

export { ClipCreatedModal }
