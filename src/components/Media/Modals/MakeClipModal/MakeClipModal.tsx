import * as React from 'react'
import * as Modal from 'react-modal'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { convertSecToHHMMSS, convertHHMMSSToSeconds } from 'lib/utility'

type Props = {
  handleEndTimePreview?: Function
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleStartTimePreview?: Function
  handleSave: Function
  isLoading?: boolean
  isOpen?: boolean
  isPublic?: boolean
  player?: any
  startTime: number
}

type State = {
  errorEndTime?: string
  errorStartTime?: string
  isPublic: boolean
  isPublicIsOpen: boolean
  isSaving: boolean
}

interface MakeClipModal {
  inputEndTime: any
  inputStartTime: any
  inputTitle: any
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

class MakeClipModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      errorEndTime: undefined,
      errorStartTime: undefined,
      isPublic: props.initialIsPublic || true,
      isPublicIsOpen: false,
      isSaving: false
    }

    this.inputStartTime = React.createRef()
    this.inputEndTime = React.createRef()
    this.inputTitle = React.createRef()
    this.selectIsPublic = this.selectIsPublic.bind(this)
    this.toggleIsPublic = this.toggleIsPublic.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.endTimePreview = this.endTimePreview.bind(this)
    this.startTimePreview = this.startTimePreview.bind(this)
  }

  selectIsPublic (e) {
    const { value } = e.currentTarget.dataset
    this.setState({ isPublic: value === 'public' })
  }

  toggleIsPublic () {
    this.setState({ isPublicIsOpen: !this.state.isPublicIsOpen })
  }

  async handleSave () {
    const { isPublic } = this.state
    const { value: startTime } = this.inputStartTime.current
    const { value: endTime } = this.inputEndTime.current
    const { value: title } = this.inputTitle.current

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
      })
    }
  }

  clearErrors () {
    return this.setState({
      errorEndTime: undefined,
      errorStartTime: undefined
    })
  }

  endTimePreview() {
    const { handleEndTimePreview, player } = this.props
    const endTime = convertHHMMSSToSeconds(this.inputEndTime.current.value)

    if (player && endTime && endTime > 0 && handleEndTimePreview) {
      player.seekTo(endTime < 3 ? 0 : endTime - 3)
      handleEndTimePreview(endTime)
    }
  }

  startTimePreview () {
    const { handleStartTimePreview, player } = this.props
    const startTime = convertHHMMSSToSeconds(this.inputStartTime.current.value)

    if (player && startTime && startTime > 0 && handleStartTimePreview) {
      player.seekTo(startTime)
      handleStartTimePreview(startTime)
    }
  }

  render () {
    const { handleHideModal, isLoading, isOpen, startTime } = this.props
    const { errorEndTime, errorStartTime, isPublic, isPublicIsOpen,
      isSaving } = this.state

    let appEl
    // @ts-ignore
    if (process.browser) {
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
          <h4><FontAwesomeIcon icon='cut' /> &nbsp;Make Clip</h4>
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
          <div className='clearfix'></div>
          <Row>
            <Col xs='6'>
              <FormGroup>
                <Label for='make-clip-modal__start-time'>Start Time</Label>
                <button
                  className='make-clip-modal__start-time-preview'
                  onClick={this.startTimePreview}
                  type='button'>
                  <FontAwesomeIcon icon='play'></FontAwesomeIcon> &nbsp; Preview
                </button>
                <Input
                  defaultValue={convertSecToHHMMSS(startTime)}
                  innerRef={this.inputStartTime}
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
                <Label for='make-clip-modal__end-time'>End Time</Label>
                <button
                  className='make-clip-modal__end-time-preview'
                  onClick={this.endTimePreview}
                  type='button'>
                  <FontAwesomeIcon icon='play'></FontAwesomeIcon> &nbsp; Preview
                </button>
                <Input
                  innerRef={this.inputEndTime}
                  invalid={!!errorEndTime}
                  name='make-clip-modal__end-time'
                  placeholder='optional'
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
              innerRef={this.inputTitle}
              name='make-clip-modal__title'
              placeholder='optional'
              type='textarea' />
          </FormGroup>
          <div className='text-right'>
            <Button
              className='make-clip-modal__cancel'
              onClick={handleHideModal}
              text='Cancel' />
            <Button
              className={`make-clip-modal__save ${isSaving ? 'is-loading' : ''}`}
              color='primary'
              isLoading={isLoading}
              onClick={this.handleSave}
              text='Save' />
          </div>
        </Form>
      </Modal>
    )
  }
}

export { MakeClipModal }
