import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { PVButton as Button } from 'components/Button/Button'
import { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { validateEmail } from 'lib/utility/validation'

type Props = {
  errorResponse?: string
  handleSubmit: Function,
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isLoading: boolean
  isOpen: boolean
}

type State = {
  email?: string
  errorEmail?: string
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

export class ForgotPasswordModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      errorEmail: undefined
    }
  }

  handleEmailInputBlur = (event) => {
    const { value: email } = event.target
    const newState: any = {}
    newState.email = email

    if (!validateEmail(email)) {
      newState.errorEmail = 'Please provide a valid email address.'
    }

    this.setState(newState)
  }

  handleEmailInputChange = (event) => {
    const { value: email } = event.target
    const newState: any = {}
    newState.email = email

    if (validateEmail(email)) {
      newState.errorEmail = null
    }

    this.setState(newState)
  }

  handleSubmit = () => {
    const { email } = this.state
    this.props.handleSubmit(email)
  }

  render () {
    const { errorResponse, hideModal, isLoading, isOpen } = this.props
    const { email, errorEmail } = this.state

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
            (errorResponse && !isLoading) &&
            <Alert color='danger'>
              {errorResponse}
            </Alert>
          }
          <FormGroup>
            <Label for='forgot-password-modal__email'>Email</Label>
            <Input
              data-state-key='email'
              invalid={errorEmail}
              name='forgot-password-modal__email'
              onBlur={this.handleEmailInputBlur}
              onChange={this.handleEmailInputChange}
              placeholder='hello@podverse.fm'
              type='text'
              value={email} />
            {
              errorEmail &&
              <FormFeedback invalid='true'>
                {errorEmail}
              </FormFeedback>
            }
          </FormGroup>
          <ButtonGroup
            childrenLeft
            childrenRight={
              <React.Fragment>
                <Button
                  onClick={hideModal}
                  text='Cancel' />
                <Button
                  color='primary'
                  disabled={!validateEmail(email)}
                  isLoading={isLoading}
                  onClick={this.handleSubmit}
                  text='Submit' />
              </React.Fragment>
            } />
        </Form>
      </Modal>
    )
  }
}
