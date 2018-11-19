import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Form, FormGroup, Input, Label } from 'reactstrap'
import Button from 'components/Button/Button'
import { CloseButton } from 'components/CloseButton/CloseButton'

type Props = {
  handleLogin: Function,
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isLoading: boolean
  isOpen: boolean
}

type State = {
  email?: string
  errorGeneral?: string
  password?: string
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '320px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

const errorsGeneral = {
  invalidFormat: 'Please provide a valid email address.'
}

export class LoginModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      errorGeneral: undefined,
      password: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleInputChange (event) {
    const { stateKey } = event.target.dataset
    const newState = {}
    newState[stateKey] = event.target.value
    this.setState(newState)
  }

  handleLogin () {
    const { email, password } = this.state
    this.clearErrors()
    this.props.handleLogin(email, password)
  }

  clearErrors () {
    this.setState({ errorGeneral: undefined })
  }

  render () {
    const { hideModal, isLoading, isOpen } = this.props
    const { email, errorGeneral, password } = this.state

    let appEl
    // @ts-ignore
    if (process.browser) {
      appEl = document.querySelector('body')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel='Login'
        isOpen={isOpen}
        onRequestClose={hideModal}
        portalClassName='login-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <Form>
          <h4>Login</h4>
          <CloseButton onClick={hideModal} />
          {
            errorGeneral &&
              <Alert color='danger'>
                {errorsGeneral[errorGeneral]}
              </Alert>
          }
          <FormGroup>
            <Label for='login-modal__email'>Email</Label>
            <Input
              data-state-key='email'
              name='login-modal__email'
              onChange={this.handleInputChange}
              placeholder='hello@podverse.fm'
              type='text'
              value={email} />
          </FormGroup>
          <FormGroup>
            <Label for='login-modal__password'>Password</Label>
            <Input
              data-state-key='password'
              name='login-modal__password'
              onChange={this.handleInputChange}
              placeholder='********'
              type='password'
              value={password} />
          </FormGroup>
          <div className='login-modal__btns text-right'>
            <Button
              className='login-modal-btns__cancel'
              onClick={hideModal}
              text='Cancel' />
            <Button
              className='login-modal-btns__login'
              isLoading={isLoading}
              onClick={this.handleLogin}
              text='Login' />
          </div>
        </Form>
      </Modal>
    )
  }
}
