import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Form, FormGroup, Input, Label } from 'reactstrap'
import { PVButton as Button } from 'components/Button/Button'
import { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { checkIfLoadingOnFrontEnd } from 'lib/utility'

type Props = {
  errorResponse?: string
  handleLogin: Function
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
  isOpen: boolean
  showForgotPasswordModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  showSignUpModal: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type State = {
  email?: string
  password?: string
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

export class LoginModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleInputChange = event => {
    const { stateKey } = event.target.dataset
    const newState = {}
    newState[stateKey] = event.target.value.trim()
    this.setState(newState)
  }

  handleLogin = () => {
    const { email, password } = this.state
    this.props.handleLogin(email, password)
  }

  handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleLogin()
    }
  }

  hideModal = event => {
    const { hideModal } = this.props
    this.setState({
      email: '',
      password: ''
    })
    hideModal(event)
  }

  render () {
    const { errorResponse, isLoading, isOpen, showForgotPasswordModal, showSignUpModal } = this.props
    const { email, password } = this.state

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
      appEl = document.querySelector('body')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel='Login'
        isOpen={isOpen}
        onRequestClose={this.hideModal}
        portalClassName='login-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <Form>
          <h3>Login</h3>
          <CloseButton onClick={this.hideModal} />
          {
            (errorResponse && !isLoading) &&
              <Alert color='danger'>
                {errorResponse}
              </Alert>
          }
          <FormGroup>
            <Label for='login-modal__email'>Email</Label>
            <Input
              data-state-key='email'
              name='login-modal__email'
              onChange={this.handleInputChange}
              onKeyPress={this.handleOnKeyPress}
              placeholder='hello@podverse.fm'
              type='email'
              value={email} />
          </FormGroup>
          <FormGroup>
            <Label for='login-modal__password'>Password</Label>
            <Input
              data-state-key='password'
              name='login-modal__password'
              onChange={this.handleInputChange}
              onKeyPress={this.handleOnKeyPress}
              placeholder='********'
              type='password'
              value={password} />
          </FormGroup>
          <ButtonGroup
            childrenLeft={
              <React.Fragment>
                <Button
                  className='btn-text'
                  onClick={showForgotPasswordModal}
                  text='Forgot?' />
                <Button
                  className='btn-text'
                  onClick={showSignUpModal}
                  text='Sign Up' />
              </React.Fragment>
            }
            childrenRight={
              <React.Fragment>
                <Button
                  className='login-modal-btns-right__cancel'
                  onClick={this.hideModal}
                  text='Cancel' />
                <Button
                  className='login-modal-btns-right__login'
                  color='primary'
                  isLoading={isLoading}
                  onClick={this.handleLogin}
                  text='Login' />
              </React.Fragment>
            } />
        </Form>
      </Modal>
    )
  }
}
