import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Form , FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { PasswordValidationInfo } from 'components/Auth/PasswordValidationInfo'
import { PVButton as Button } from 'components/Button/Button'
import { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { checkIfLoadingOnFrontEnd } from 'lib/utility'
import { hasAtLeastXCharacters as hasAtLeastXCharactersLib, hasLowercase as hasLowercaseLib,
  hasMatchingStrings, hasNoSpaces as hasNoSpacesLib, hasNumber as hasNumberLib,
  hasUppercase as hasUppercaseLib, validateEmail, validatePassword } from 'lib/utility/validation'

type Props = {
  errorResponse?: string
  handleSignUp: Function
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
  isOpen: boolean
  showSignUpModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  signUpFinished?: boolean
  topText?: string
}

type State = {
  email?: string
  errorEmail?: string
  errorPassword?: string
  errorPasswordConfirm?: string
  hasAtLeastXCharacters: boolean
  hasLowercase: boolean
  hasMatching: boolean
  hasNoSpaces: boolean
  hasNumber: boolean
  hasUppercase: boolean
  hasValidEmail: boolean
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
      hasAtLeastXCharacters: false,
      hasLowercase: false,
      hasMatching: false,
      hasNoSpaces: false,
      hasNumber: false,
      hasUppercase: false,
      hasValidEmail: false,
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
    newState.email = email.trim()

    if (validateEmail(email)) {
      newState.hasValidEmail = true
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

    this.setState(newState, () => {
      this.passwordsValid()
    })
  }

  handlePasswordInputChange = event => {
    const { value: password } = event.target
    const newState: any = {}
    newState.password = password

    if (validatePassword(password)) {
      newState.errorPassword = null
    }

    this.setState(newState, () => {
      this.passwordsValid()
    })
  }

  handlePasswordConfirmInputBlur = event => {
    const { errorPassword, password } = this.state
    const { value: passwordConfirm } = event.target
    const newState: any = {}

    if (!errorPassword && passwordConfirm !== password) {
      newState.errorPasswordConfirm = 'Passwords do not match.'
    }

    this.setState(newState, () => {
      this.passwordsValid()
    })
  }

  handlePasswordConfirmInputChange = event => {
    const { errorPassword, password } = this.state
    const { value: passwordConfirm } = event.target
    const newState: any = {}
    newState.passwordConfirm = passwordConfirm

    if (!errorPassword && passwordConfirm === password) {
      newState.errorPasswordConfirm = null
    }

    this.setState(newState, () => {
      this.passwordsValid()
    })
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

  passwordsValid = () => {
    const { password, passwordConfirm } = this.state
    const hasAtLeastXCharacters = hasAtLeastXCharactersLib(password)
    const hasLowercase = hasLowercaseLib(password)
    const hasMatching = hasMatchingStrings(password, passwordConfirm)
    const hasNoSpaces = hasNoSpacesLib(password)
    const hasNumber = hasNumberLib(password)
    const hasUppercase = hasUppercaseLib(password)

    this.setState({
      hasAtLeastXCharacters,
      hasLowercase,
      hasMatching,
      hasNoSpaces,
      hasNumber,
      hasUppercase
    })
  }

  submitDisabled = () => {
    const { hasAtLeastXCharacters, hasLowercase, hasMatching, hasNoSpaces, hasNumber, hasUppercase,
      hasValidEmail } = this.state
    return !(hasAtLeastXCharacters && hasLowercase && hasMatching && hasNoSpaces && hasNumber &&
      hasUppercase && hasValidEmail)
  }

  render () {
    const { errorResponse, hideModal, isLoading, isOpen, signUpFinished, topText } = this.props
    const { email, errorEmail, errorPassword, errorPasswordConfirm, hasAtLeastXCharacters,
      hasLowercase, hasNumber, hasUppercase, password, passwordConfirm } = this.state
    
    const submitDisabled = this.submitDisabled()

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
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
          <h3>{signUpFinished ? 'Verify Email' : 'Sign Up'}</h3>
          <CloseButton onClick={hideModal} />
          {
            (errorResponse && !isLoading) &&
              <Alert color='danger'>
                {errorResponse}
              </Alert>
          }
          {
            signUpFinished &&
              <>
                <p style={{ marginTop: '32px', textAlign: 'center' }}>
                  Please check your inbox and verify your email to login to your account.
                  You may need to check your Spam folder.
                </p>
                <ButtonGroup
                  childrenLeft
                  childrenRight={
                    <Button
                      color='secondary'
                      onClick={hideModal}
                      text='Close' />
                  } />
              </>
          }
          {
            !signUpFinished &&
              <>
                <div style={{ overflow: 'hidden' }}>
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
                      type='email'
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
                  <PasswordValidationInfo
                    hasAtLeastXCharacters={hasAtLeastXCharacters}
                    hasLowercase={hasLowercase}
                    hasNumber={hasNumber}
                    hasUppercase={hasUppercase} />
                  <ButtonGroup
                    childrenLeft
                    childrenRight={
                      <React.Fragment>
                        <Button
                          onClick={hideModal}
                          text='Cancel' />
                        <Button
                          color='primary'
                          disabled={submitDisabled}
                          isLoading={isLoading}
                          onClick={this.handleSignUp}
                          text='Sign Up' />
                      </React.Fragment>
                    } />
                  </div>
                </>
          }
        </Form>
      </Modal>
    )
  }
}
