import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { CloseButton } from 'components/CloseButton/CloseButton'

type Props = {
  handleSubmit: Function,
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isOpen: boolean
}

type State = {
  errorGeneral?: string,
  isLoading: boolean
  password?: string
  username?: string
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
      errorGeneral: undefined,
      isLoading: false,
      password: '',
      username: ''
    }

  }

  handleInputChange (event) {
    debugger
  }

  handleSubmit () {
    const { password, username } = this.state

    this.clearErrors()

    this.props.handleSubmit({
      password,
      username
    })
  }

  clearErrors () {
    return this.setState({
      errorGeneral: undefined
    })
  }

  render () {
    const { hideModal, isOpen } = this.props
    const { errorGeneral, isLoading } = this.state

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
            <Label for='login-modal__username'>Email</Label>
            <Input
              name='login-modal__username'
              placeholder='hello@podverse.fm'
              type='text' />
          </FormGroup>
          <FormGroup>
            <Label for='login-modal__password'>Password</Label>
            <Input
              name='login-modal__password'
              placeholder='********'
              type='password' />
          </FormGroup>
          <div className='login-modal__btns text-right'>
            <Button
              className='login-modal-btns__cancel'
              onClick={hideModal}>
              Cancel
            </Button>
            <Button
              className={`login-modal-btns__login ${isLoading ? 'is-loading' : ''}`}
              onClick={this.handleSubmit}>
              Login
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
