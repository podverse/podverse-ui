import * as React from 'react'
import * as Modal from 'react-modal'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { checkIfLoadingOnFrontEnd, convertSecToHHMMSS, convertHHMMSSToSeconds } from 'lib/utility'

type Props = {
  endTime?: number
  handleDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleEndTimePreview?: Function
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleSave: Function
  handleStartTimePreview?: Function
  initialIsPublic?: boolean
  isDeleting?: boolean
  isEditing?: boolean
  isLoggedIn?: boolean
  isSaving?: boolean
  isOpen?: boolean
  player?: any
  refInputEndTime: any
  refInputStartTime: any
  refInputTitle: any
  startTime: number
  title?: string
}

type State = {
  errorEndTime?: string
  errorStartTime?: string
  initialEndTime?: number | null
  initialStartTime?: number | null
  initialTitle?: string
  isPublic?: boolean
  isPublicIsOpen: boolean
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '540px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

const endTimeErrors = {
  invalidFormat: 'Time must be in hh:mm:ss format'
}

const startTimeErrors = {
  invalidFormat: 'Time must be in hh:mm:ss format',
  required: 'Start time is required'
}

const onlyWithClipAlertText = `Only with Link means only people who have your clip's link can play it.

These clips are not private, but they will not show up automatically in lists on Podverse.

A premium account is required to create Public clips.`

const _inProgressMakeClipTitleKey = 'inProgressMakeClipTitle'
const _inProgressMakeStartTimeKey = 'inProgressMakeStartTime'
const _inProgressMakeEndTimeKey = 'inProgressMakeEndTime'

class MakeClipModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    const initialStartTimeString = window.sessionStorage.getItem(_inProgressMakeStartTimeKey)
    const initialEndTimeString = window.sessionStorage.getItem(_inProgressMakeEndTimeKey)
    const initialTitle = window.sessionStorage.getItem(_inProgressMakeClipTitleKey) || ''

    const initialStartTime = convertHHMMSSToSeconds(initialStartTimeString)
    const initialEndTime = convertHHMMSSToSeconds(initialEndTimeString)

    this.state = {
      errorEndTime: undefined,
      errorStartTime: undefined,
      initialEndTime,
      initialStartTime,
      initialTitle,
      isPublic: undefined,
      isPublicIsOpen: false
    }
  }

  static getDerivedStateFromProps(props, currentState) {
    const newState = {} as any
    if (typeof props.isEditing !== 'undefined' && typeof currentState.isPublic === 'undefined') {
      newState.isPublic = props.initialIsPublic
    }

    const initialStartTimeString = window.sessionStorage.getItem(_inProgressMakeStartTimeKey)
    const initialEndTimeString = window.sessionStorage.getItem(_inProgressMakeEndTimeKey)
    const initialTitle = window.sessionStorage.getItem(_inProgressMakeClipTitleKey)

    const initialStartTime = convertHHMMSSToSeconds(initialStartTimeString)
    const initialEndTime = convertHHMMSSToSeconds(initialEndTimeString)

    newState.initialStartTime = initialStartTime
    newState.initialEndTime = initialEndTime
    newState.initialTitle = initialTitle

    return newState
  }

  selectIsPublic = e => {
    const { value } = e.currentTarget.dataset
    this.setState({ isPublic: value === 'public' })
  }

  toggleIsPublic = () => {
    this.setState({ isPublicIsOpen: !this.state.isPublicIsOpen })
  }

  handleSave = async event => {
    event.preventDefault()
    const { isEditing, refInputEndTime, refInputStartTime, refInputTitle } = this.props
    const { isPublic } = this.state
    const { value: startTime } = refInputStartTime.current
    const { value: endTime } = refInputEndTime.current
    const { value: title } = refInputTitle.current

    const startTimeSeconds = convertHHMMSSToSeconds(startTime)
    const endTimeSeconds = convertHHMMSSToSeconds(endTime)

    await this.clearErrors()

    if (!startTime) {
      this.setState({ errorStartTime: 'required' })
    } else {
      this.props.handleSave({
        isPublic,
        startTime: startTimeSeconds,
        endTime: endTimeSeconds,
        title
      }, isEditing)
    }
  }

  clearErrors = () => {
    return this.setState({
      errorEndTime: undefined,
      errorStartTime: undefined
    })
  }

  endTimePreview = () => {
    const { handleEndTimePreview, player, refInputEndTime } = this.props
    const endTime = convertHHMMSSToSeconds(refInputEndTime.current.value)

    if (player && endTime && endTime > 0 && handleEndTimePreview) {
      player.seekTo(endTime < 3 ? 0 : endTime - 3)
      handleEndTimePreview(endTime)
    }
  }

  startTimePreview = () => {
    const { handleStartTimePreview, player, refInputStartTime } = this.props
    const startTime = convertHHMMSSToSeconds(refInputStartTime.current.value)

    if (player && startTime && startTime > 0 && handleStartTimePreview) {
      player.seekTo(startTime)
      handleStartTimePreview(startTime)
    }
  }

  render () {
    const { endTime, handleDelete, handleHideModal, isDeleting, isEditing, isLoggedIn, isOpen, isSaving,
      refInputEndTime, refInputStartTime, refInputTitle, startTime, title } = this.props
    const { errorEndTime, errorStartTime, initialEndTime, initialStartTime, initialTitle,
      isPublic, isPublicIsOpen } = this.state

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
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
        <Form>
          {
            isEditing ?
              <h3><FontAwesomeIcon icon='edit' /> &nbsp;Edit Clip</h3> :
              <h3><FontAwesomeIcon icon='cut' /> &nbsp;Make Clip</h3>
          }
          {
            !isLoggedIn &&
              <div className='dropdown make-clip-modal__is-public'>
                <div className='btn one-option-only' onClick={() => window.alert(onlyWithClipAlertText)}>
                  <FontAwesomeIcon icon='link' /> Only with Link
                </div>
              </div>
          }
          {
            isLoggedIn &&
              <Dropdown
                className='make-clip-modal__is-public transparent-btn'
                isOpen={isPublicIsOpen}
                toggle={this.toggleIsPublic}>
                <DropdownToggle caret>
                  {
                    isPublic &&
                      <React.Fragment>
                        <FontAwesomeIcon icon='globe-americas' /> Public
                      </React.Fragment>
                  }
                  {
                    !isPublic &&
                      <React.Fragment>
                        <FontAwesomeIcon icon='link' /> Only with link
                      </React.Fragment>
                  }
                </DropdownToggle>
                <DropdownMenu>
                  {
                    !isPublic &&
                      <DropdownItem
                        data-value='public'
                        onClick={this.selectIsPublic}>
                        <FontAwesomeIcon icon='globe-americas' /> Public
                      </DropdownItem>
                  }
                  {
                    isPublic &&
                      <DropdownItem
                        data-value='only-with-link'
                        onClick={this.selectIsPublic}>
                        <FontAwesomeIcon icon='link' /> Only with link
                      </DropdownItem>
                  }
                </DropdownMenu>
              </Dropdown>
          }
          <div className='clearfix'></div>
          <Row>
            <Col xs='6'>
              <FormGroup>
                <Label for='make-clip-modal__start-time'>Start</Label>
                <button
                  className='make-clip-modal__start-time-preview'
                  onClick={this.startTimePreview}
                  type='button'>
                  <FontAwesomeIcon icon='play'></FontAwesomeIcon> &nbsp; Preview
                </button>
                <Input
                  defaultValue={initialStartTime ? convertSecToHHMMSS(initialStartTime) : convertSecToHHMMSS(startTime)}
                  innerRef={refInputStartTime}
                  invalid={!!errorStartTime}
                  name='make-clip-modal__start-time'
                  placeholder='--:--:--'
                  type='text' />
                  {
                    !!errorStartTime &&
                      <FormFeedback invalid>
                        {startTimeErrors[errorStartTime]}
                      </FormFeedback>
                  }
              </FormGroup>
            </Col>
            <Col xs='6'>
              <FormGroup>
                <Label for='make-clip-modal__end-time'>End</Label>
                <button
                  className='make-clip-modal__end-time-preview'
                  onClick={this.endTimePreview}
                  type='button'>
                  <FontAwesomeIcon icon='play'></FontAwesomeIcon> &nbsp; Preview
                </button>
                <Input
                  defaultValue={endTime ? convertSecToHHMMSS(endTime) : initialEndTime ? convertSecToHHMMSS(initialEndTime) : ''}
                  innerRef={refInputEndTime}
                  invalid={!!errorEndTime}
                  name='make-clip-modal__end-time'
                  placeholder='hh:mm:ss'
                  type='text' />
                {
                  !!errorEndTime &&
                    <FormFeedback invalid>
                      {endTimeErrors[errorEndTime]}
                    </FormFeedback>
                }
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for='make-clip-modal__title'>Title</Label>
            <Input
              defaultValue={title ? title : initialTitle ? initialTitle : ''}
              innerRef={refInputTitle}
              name='make-clip-modal__title'
              placeholder='optional'
              rows='3'
              type='textarea' />
          </FormGroup>
          <div className='text-right'>
            {
              isEditing &&
                <Button
                  className='make-clip-modal__delete'
                  disabled={isDeleting || isSaving}
                  color='danger'
                  isLoading={isDeleting}
                  onClick={handleDelete}
                  text='Delete' />
            }
            <Button
              className='make-clip-modal__cancel'
              disabled={isDeleting || isSaving}
              onClick={handleHideModal}
              text='Cancel' />
            <Button
              className='make-clip-modal__save'
              color='primary'
              disabled={isDeleting || isSaving}
              isLoading={isSaving}
              onClick={this.handleSave}
              text='Save' />
          </div>
        </Form>
      </Modal>
    )
  }
}

export { MakeClipModal }
