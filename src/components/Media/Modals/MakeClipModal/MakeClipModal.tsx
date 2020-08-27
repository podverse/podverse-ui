import * as React from 'react'
import * as Modal from 'react-modal'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { KEYS } from 'lib/keys'
import { checkIfLoadingOnFrontEnd, convertSecToHHMMSS, convertHHMMSSToSeconds } from 'lib/utility'
import Link from 'next/link'

type Props = {
  endTime?: number
  handleDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleEndTimePreview?: Function
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void
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
  t: any
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

class MakeClipModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      errorEndTime: undefined,
      errorStartTime: undefined,
      isPublic: undefined,
      isPublicIsOpen: false
    }
  }

  componentDidMount() {
    const initialStartTimeString = window.sessionStorage.getItem(KEYS.inProgressMakeStartTimeKey)
    const initialEndTimeString = window.sessionStorage.getItem(KEYS.inProgressMakeEndTimeKey)
    const initialTitle = window.sessionStorage.getItem(KEYS.inProgressMakeClipTitleKey) || ''

    const initialStartTime = convertHHMMSSToSeconds(initialStartTimeString)
    const initialEndTime = convertHHMMSSToSeconds(initialEndTimeString)

    this.setState({
      initialEndTime,
      initialStartTime,
      initialTitle
    })
  }

  static getDerivedStateFromProps(props, currentState) {
    const newState = {} as any
    if (typeof props.isEditing !== 'undefined' && typeof currentState.isPublic === 'undefined') {
      newState.isPublic = props.initialIsPublic
    }

    if (typeof window !== 'undefined') {
      const initialStartTimeString = window.sessionStorage.getItem(KEYS.inProgressMakeStartTimeKey)
      const initialEndTimeString = window.sessionStorage.getItem(KEYS.inProgressMakeEndTimeKey)
      const initialTitle = window.sessionStorage.getItem(KEYS.inProgressMakeClipTitleKey)
  
      const initialStartTime = convertHHMMSSToSeconds(initialStartTimeString)
      const initialEndTime = convertHHMMSSToSeconds(initialEndTimeString)
  
      newState.initialStartTime = initialStartTime
      newState.initialEndTime = initialEndTime
      newState.initialTitle = initialTitle
    }

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
    const { endTime, handleDelete, handleHideModal, isDeleting, isEditing, isLoggedIn,
      isOpen, isSaving, refInputEndTime, refInputStartTime, refInputTitle, startTime, t, title } = this.props
    const { errorEndTime, errorStartTime, initialEndTime, initialStartTime, initialTitle,
      isPublic, isPublicIsOpen } = this.state

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
      appEl = document.querySelector('body')
    }

    const endTimeErrors = {
      invalidFormat: t('Time must be in hhmmss format')
    }

    const startTimeErrors = {
      invalidFormat: t('Time must be in hhmmss format'),
      required: t('Start time is required')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel={t('Make clip')}
        isOpen={isOpen}
        onRequestClose={handleHideModal}
        portalClassName='make-clip-modal'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <Form>
          {
            isEditing ?
              <h3><FontAwesomeIcon icon='edit' /> &nbsp;{t('Edit Clip')}</h3> :
              <h3><FontAwesomeIcon icon='cut' /> &nbsp;{t('Make Clip')}</h3>
          }
          <Dropdown
            className='make-clip-modal__is-public transparent-btn'
            isOpen={isPublicIsOpen}
            toggle={this.toggleIsPublic}>
            <DropdownToggle caret>
              {
                isPublic &&
                  <React.Fragment>
                    <FontAwesomeIcon icon='globe-americas' /> {t('Public')}
                  </React.Fragment>
              }
              {
                !isPublic &&
                  <React.Fragment>
                    <FontAwesomeIcon icon='link' /> {t('Only with link')}
                  </React.Fragment>
              }
            </DropdownToggle>
            <DropdownMenu>
              {
                !isPublic &&
                  <DropdownItem
                    data-value='public'
                    onClick={this.selectIsPublic}>
                    <FontAwesomeIcon icon='globe-americas' /> {t('Public')}
                  </DropdownItem>
              }
              {
                isPublic &&
                  <DropdownItem
                    data-value='only-with-link'
                    onClick={this.selectIsPublic}>
                  <FontAwesomeIcon icon='link' /> {t('Only with link')}
                  </DropdownItem>
              }
            </DropdownMenu>
          </Dropdown>
          <div className='clearfix'></div>
          {
            !isLoggedIn &&
            <div className='make-clip-modal__login-msg'>
              {t('LoginToCreateAndShareClips')}
            </div>
          }
          <Row>
            <Col xs='6'>
              <FormGroup>
                <Label for='make-clip-modal__start-time'>{t('Start')}</Label>
                <button
                  className='make-clip-modal__start-time-preview'
                  onClick={this.startTimePreview}
                  type='button'>
                  <FontAwesomeIcon icon='play'></FontAwesomeIcon> &nbsp; {t('Preview')}
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
                <Label for='make-clip-modal__end-time'>{t('End')}</Label>
                <button
                  className='make-clip-modal__end-time-preview'
                  onClick={this.endTimePreview}
                  type='button'>
                  <FontAwesomeIcon icon='play'></FontAwesomeIcon> &nbsp; {t('Preview')}
                </button>
                <Input
                  defaultValue={endTime ? convertSecToHHMMSS(endTime) : initialEndTime ? convertSecToHHMMSS(initialEndTime) : ''}
                  innerRef={refInputEndTime}
                  invalid={!!errorEndTime}
                  name='make-clip-modal__end-time'
                  placeholder={t('hhmmss')}
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
            <Label for='make-clip-modal__title'>{t('Title')}</Label>
            <Input
              defaultValue={title ? title : initialTitle ? initialTitle : ''}
              innerRef={refInputTitle}
              name='make-clip-modal__title'
              placeholder={t('optional')}
              rows='3'
              type='textarea' />
          </FormGroup>
          <div className='text-right'>
            {
              !isEditing &&
                <React.Fragment>
                  <Link
                    as='/faq#why-do-some-clips-start-at-the-wrong-time'
                    href='/faq#why-do-some-clips-start-at-the-wrong-time'>
                    <a
                      className='make-clip-modal__dynamic-ads'
                      onClick={handleHideModal}>
                      FAQ
                    </a>
                  </Link>
                  <div className='make-clip-modal__divider'>/</div>
                  <Link
                    as='/my-profile?type=clips'
                    href='/my-profile?type=clips'>
                    <a
                      className='make-clip-modal__my-clips'
                      onClick={handleHideModal}>
                      {t('My Clips')}
                    </a>
                  </Link>
                </React.Fragment>
            }
            {
              isEditing &&
                <Button
                  className='make-clip-modal__delete'
                  disabled={isDeleting || isSaving}
                  color='danger'
                  isLoading={isDeleting}
                  onClick={handleDelete}
                  text={t('Delete')} />
            }
            <Button
              className='make-clip-modal__cancel'
              disabled={isDeleting || isSaving}
              onClick={handleHideModal}
              text={t('Cancel')} />
            <Button
              className='make-clip-modal__save'
              color='primary'
              disabled={isDeleting || isSaving || !isLoggedIn}
              isLoading={isSaving}
              onClick={this.handleSave}
              text={t('Save')} />
          </div>
        </Form>
      </Modal>
    )
  }
}

export { MakeClipModal }
