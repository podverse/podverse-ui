import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Form, FormGroup, Input, Label } from 'reactstrap'
import Button from 'components/Button/Button'
import { CloseButton } from 'components/CloseButton/CloseButton'

type Props = {
  handleSubmit: Function,
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isLoading: boolean
  isOpen: boolean
}

type State = {
  email?: string
  errorGeneral?: string
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '340px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

const errorsGeneral = {
  invalidFormat: 'Please provide a valid email address.'
}

export class ForgotPasswordModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      errorGeneral: undefined
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const { stateKey } = event.target.dataset
    const newState = {}
    newState[stateKey] = event.target.value
    this.setState(newState)
  }

  handleSubmit () {
    const { email } = this.state
    this.clearErrors()
    this.props.handleSubmit(email)
  }

  clearErrors () {
    this.setState({ errorGeneral: undefined })
  }

  render () {
    const { hideModal, isLoading, isOpen } = this.props
    const { email, errorGeneral } = this.state

    let appEl
    // @ts-ignore
    if (process.browser) {
      appEl = document.querySelector('body')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel='Forgot Password'
        isOpen={isOpen}
        onRequestClose={hideModal}
        portalClassName='forgot-password-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <Form>
          <h4>Forgot Password</h4>
          <CloseButton onClick={hideModal} />
          {
            errorGeneral &&
            <Alert color='danger'>
              {errorsGeneral[errorGeneral]}
            </Alert>
          }
          <FormGroup>
            <Label for='forgot-password-modal__email'>Email</Label>
            <Input
              data-state-key='email'
              name='forgot-password-modal__email'
              onChange={this.handleInputChange}
              placeholder='hello@podverse.fm'
              type='text'
              value={email} />
          </FormGroup>
          <div className='forgot-password-modal__btns'>
            <div className='forgot-password-modal-btns__left' />
            <div className='forgot-password-modal-btns__right'>
              <Button
                className='forgot-password-modal-btns-right__cancel'
                onClick={hideModal}
                text='Cancel' />
              <Button
                className='forgot-password-modal-right__send'
                isLoading={isLoading}
                onClick={this.handleSubmit}
                text='Send' />
            </div>
          </div>
        </Form>
      </Modal>
    )
  }
}
