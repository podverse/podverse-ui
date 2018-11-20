import * as React from 'react'
import * as Modal from 'react-modal'
import { Alert, Form, FormGroup, Input, Label } from 'reactstrap'
import { PVButton as Button } from 'components/Button/Button'
import { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'
import { CloseButton } from 'components/CloseButton/CloseButton'

type Props = {
  handleSignUp: Function
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
  isOpen: boolean
  showSignUpModal: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type State = {
  email?: string
  errorGeneral?: string
  password?: string
  passwordConfirm?: string
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '360px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

const errorsGeneral = {
  invalidFormat: 'Please provide a valid email address.'
}

export class SignUpModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      errorGeneral: undefined,
      password: '',
      passwordConfirm: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleInputChange (event) {
    const { stateKey } = event.target.dataset
    const newState = {}
    newState[stateKey] = event.target.value
    this.setState(newState)
  }

  handleSignUp () {
    const { email, passwordConfirm } = this.state
    this.clearErrors()
    this.props.handleSignUp(email, passwordConfirm)
  }

  clearErrors () {
    this.setState({ errorGeneral: undefined })
  }

  render () {

    const { hideModal, isLoading, isOpen } = this.props
    const { email, errorGeneral, password, passwordConfirm } = this.state

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
          <h4>Sign Up</h4>
          <CloseButton onClick={hideModal} />
          {
            errorGeneral &&
            <Alert color='danger'>
              {errorsGeneral[errorGeneral]}
            </Alert>
          }
          <FormGroup>
            <Label for='sign-up-modal__email'>Email</Label>
            <Input
              data-state-key='email'
              name='sign-up-modal__email'
              onChange={this.handleInputChange}
              placeholder='hello@podverse.fm'
              type='text'
              value={email} />
          </FormGroup>
          <FormGroup>
            <Label for='sign-up-modal__password'>Password</Label>
            <Input
              data-state-key='password'
              name='sign-up-modal__password'
              onChange={this.handleInputChange}
              placeholder='********'
              type='password'
              value={password} />
          </FormGroup>
          <FormGroup>
            <Label for='sign-up-modal__password-confirm'>Confirm Password</Label>
            <Input
              data-state-key='passwordConfirm'
              name='sign-up-modal__password-confirm'
              onChange={this.handleInputChange}
              placeholder='********'
              type='password'
              value={passwordConfirm} />
          </FormGroup>
          <ButtonGroup
            childrenLeft
            childrenRight={
              <React.Fragment>
                <Button
                  onClick={hideModal}
                  text='Cancel' />
                <Button
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
