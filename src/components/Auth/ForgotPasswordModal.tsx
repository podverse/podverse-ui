import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap'
import { PVButton as Button } from 'components/Button/Button'
import { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { validateEmail } from 'lib/utility/validation'
import { checkIfLoadingOnFrontEnd } from 'lib/utility'

type Props = {
  errorResponse?: string
  handleSubmit: Function,
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isLoading: boolean
  isOpen: boolean
  isResetPassword?: boolean
  isSendVerificationEmail?: boolean
  t: any
}

type State = {
  email?: string
  errorEmail?: string
  submitIsDisabled: boolean
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
      errorEmail: undefined,
      submitIsDisabled: true
    }
  }

  handleEmailInputBlur = (event) => {
    const { t } = this.props
    const { value: email } = event.target
    const newState: any = {}
    newState.email = email

    if (!validateEmail(email)) {
      newState.errorEmail = t('errorMessages:message.PleaseProvideValidEmail')
    }

    this.setState(newState, () => {
      this.checkIfSubmitIsDisabled()
    })
  }

  handleEmailInputChange = (event) => {
    const { value: email } = event.target
    const newState: any = {}
    newState.email = email.trim()

    if (validateEmail(email)) {
      newState.errorEmail = null
    }

    this.setState(newState, () => {
      this.checkIfSubmitIsDisabled()
    })
  }

  handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const { email } = this.state
      this.props.handleSubmit(email)
    }
  }

  checkIfSubmitIsDisabled = () => {
    const submitIsDisabled = !validateEmail(this.state.email)
    this.setState({ submitIsDisabled })
  }

  handleSubmit = () => {
    const { email } = this.state
    this.props.handleSubmit(email)
  }

  render () {
    const { errorResponse, hideModal, isLoading, isOpen, isResetPassword, isSendVerificationEmail, t } = this.props
    const { email, errorEmail, submitIsDisabled } = this.state

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
      appEl = document.querySelector('body')
    }

    let label = t('Forgot Password')
    if (isResetPassword) {
      label = t('Reset Password')
    } else if (isSendVerificationEmail) {
      label = t('Send Verification Email')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel={label}
        isOpen={isOpen}
        onRequestClose={hideModal}
        portalClassName='forgot-password-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <Form>
          <h3>{label}</h3>
          <CloseButton onClick={hideModal} />
          {
            (errorResponse && !isLoading) &&
            <Alert color='danger'>
              {errorResponse}
            </Alert>
          }
          <FormGroup>
            <Label for='forgot-password-modal__email'>{t('Email')}</Label>
            <Input
              data-state-key='email'
              invalid={errorEmail}
              name='forgot-password-modal__email'
              onBlur={this.handleEmailInputBlur}
              onChange={this.handleEmailInputChange}
              onKeyPress={this.handleOnKeyPress}
              placeholder='hello@podverse.fm'
              type='email'
              tooltip={!errorEmail}
              value={email} />
            {
              errorEmail &&
                <FormFeedback invalid={true}>
                  {errorEmail}
                </FormFeedback>
            }
            {
              !errorEmail &&
                <FormText>
                  {t('Check your email after pressing submit')}
                </FormText>
            }
          </FormGroup>
          <ButtonGroup
            childrenLeft
            childrenRight={
              <React.Fragment>
                <Button
                  onClick={hideModal}
                  text={t('Cancel')} />
                <Button
                  color='primary'
                  disabled={submitIsDisabled}
                  isLoading={isLoading}
                  onClick={this.handleSubmit}
                  text={t('Submit')} />
              </React.Fragment>
            } />
        </Form>
      </Modal>
    )
  }
}
