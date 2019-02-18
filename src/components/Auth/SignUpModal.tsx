import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { PVButton as Button } from 'components/Button/Button'
import { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { validateEmail, validatePassword } from 'lib/utility/validation'

type Props = {
  errorResponse?: string
  handleSignUp: Function
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
  isOpen: boolean
  showSignUpModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  topText?: string
}

type State = {
  email?: string
  errorEmail?: string
  errorPassword?: string
  errorPasswordConfirm?: string
  password?: string
  passwordConfirm?: string
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '380px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

export class SignUpModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      errorEmail: undefined,
      errorPassword: undefined,
      errorPasswordConfirm: undefined,
      password: '',
      passwordConfirm: ''
    }
  }

  handleEmailInputBlur = event => {
    const { value: email } = event.target
    const newState: any = {}
    newState.email = email

    if (!validateEmail(email)) {
      newState.errorEmail = 'Please provide a valid email address.'
    }

    this.setState(newState)
  }

  handleEmailInputChange = event => {
    const { value: email } = event.target
    const newState: any = {}
    newState.email = email

    if (validateEmail(email)) {
      newState.errorEmail = null
    }

    this.setState(newState)
  }

  handlePasswordInputBlur = event => {
    const { value: password } = event.target
    const newState: any = {}

    if (password && !validatePassword(password)) {
      newState.errorPassword = 'Password must contain a number, uppercase, lowercase, and be at least 8 characters long.'
    } else if (validatePassword(password)) {
      newState.errorPassword = null
    }

    this.setState(newState)
  }

  handlePasswordInputChange = event => {
    const { value: password } = event.target
    const newState: any = {}
    newState.password = password

    if (validatePassword(password)) {
      newState.errorPassword = null
    }

    this.setState(newState)
  }

  handlePasswordConfirmInputBlur = event => {
    const { errorPassword, password } = this.state
    const { value: passwordConfirm } = event.target
    const newState: any = {}

    if (!errorPassword && passwordConfirm !== password) {
      newState.errorPasswordConfirm = 'Passwords do not match.'
    }

    this.setState(newState)
  }

  handlePasswordConfirmInputChange = event => {
    const { errorPassword, password } = this.state
    const { value: passwordConfirm } = event.target
    const newState: any = {}
    newState.passwordConfirm = passwordConfirm

    if (!errorPassword && passwordConfirm === password) {
      newState.errorPasswordConfirm = null
    }

    this.setState(newState)
  }

  handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSignUp()
    }
  }

  handleSignUp = () => {
    const { email, passwordConfirm } = this.state
    this.props.handleSignUp(email, passwordConfirm)
  }

  hasEmailAndConfirmedValidPassword = () => {
    const { email, password, passwordConfirm } = this.state

    return validateEmail(email)
      && password === passwordConfirm
      && validatePassword(password)
      && validatePassword(passwordConfirm)
  }

  render () {

    const { errorResponse, hideModal, isLoading, isOpen, topText } = this.props
    const { email, errorEmail, errorPassword, errorPasswordConfirm,
      password, passwordConfirm } = this.state

    let appEl
    // @ts-ignore
    if (process.browser) {
      appEl = document.querySelector('body')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel='Sign Up'
        isOpen={isOpen}
        onRequestClose={hideModal}
        portalClassName='sign-up-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <Form>
          <h3>Sign Up</h3>
          <CloseButton onClick={hideModal} />
          {
            (errorResponse && !isLoading) &&
            <Alert color='danger'>
              {errorResponse}
            </Alert>
          }
          {topText}
          <FormGroup>
            <Label for='sign-up-modal__email'>Email</Label>
            <Input
              data-state-key='email'
              invalid={errorEmail}
              name='sign-up-modal__email'
              onBlur={this.handleEmailInputBlur}
              onChange={this.handleEmailInputChange}
              onKeyPress={this.handleOnKeyPress}
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
          <FormGroup>
            <Label for='sign-up-modal__password'>Password</Label>
            <Input
              data-state-key='password'
              invalid={errorPassword}
              name='sign-up-modal__password'
              onBlur={this.handlePasswordInputBlur}
              onChange={this.handlePasswordInputChange}
              onKeyPress={this.handleOnKeyPress}
              placeholder='********'
              type='password'
              value={password} />
            {
              errorPassword &&
              <FormFeedback invalid='true'>
                {errorPassword}
              </FormFeedback>
            }
          </FormGroup>
          <FormGroup>
            <Label for='sign-up-modal__password-confirm'>Confirm Password</Label>
            <Input
              data-state-key='passwordConfirm'
              invalid={errorPasswordConfirm}
              name='sign-up-modal__password-confirm'
              onBlur={this.handlePasswordConfirmInputBlur}
              onChange={this.handlePasswordConfirmInputChange}
              onKeyPress={this.handleOnKeyPress}
              placeholder='********'
              type='password'
              value={passwordConfirm} />
            {
              errorPasswordConfirm &&
              <FormFeedback invalid='true'>
                {errorPasswordConfirm}
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
                  disabled={!this.hasEmailAndConfirmedValidPassword()}
                  isLoading={isLoading}
                  onClick={this.handleSignUp}
                  text='Submit' />
              </React.Fragment>
            } />
        </Form>
      </Modal>
    )
  }
}
