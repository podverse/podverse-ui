import * as React from 'react'
import FilePlayer from 'react-player/lib/players/FilePlayer'
import { Progress } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as ReactTooltip from 'react-tooltip'
import { keyLeftArrow, keyRightArrow } from 'lib/constants'
import { convertSecToHHMMSS, readableClipTime } from 'lib/util'
import { AddToModal } from './AddToModal/AddToModal'
import MakeClipModal from './MakeClipModal/MakeClipModal'
import { QueueModal } from './QueueModal/QueueModal'
import ShareModal from './ShareModal/ShareModal'

type Props = {
  autoplay?: boolean
  clipEndTime?: number
  clipStartTime?: number
  clipTitle?: string
  episodeMediaUrl?: string
  episodeTitle?: string
  handleAddTo?: Function
  handleMakeClip?: Function
  handleOnAutoplay?: Function
  handleOnEpisodeEnd?: Function
  handleOnPastClipTime?: Function
  handleOnSkip?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleOnTimeJumpBackward?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleOnTimeJumpForward?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleQueue?: Function
  handleShare?: Function
  imageUrl?: string
  playbackRate?: number
  playerClipLink?: string
  playerEpisodeLink?: string
  playerPodcastLink?: string
  playing?: boolean
  podcastTitle?: string
  showAutoplay?: boolean
  showTimeJumpBackward?: boolean
}

type State = {
  autoplay: boolean
  clipEndFlagPositionX?: number
  clipFinished: boolean
  clipStartFlagPositionX?: number
  duration: number | null
  isClientSide: boolean
  openAddToModal: boolean
  openMakeClipModal: boolean
  openQueueModal: boolean
  openShareModal: boolean
  playbackRate: number
  played: number
  playedSeconds: number
  playing: boolean
  progressPreviewTime: number
  seeking: boolean
}

type ClipFlagPositions = {
  clipEndFlagPositionX?: number
  clipStartFlagPositionX?: number
}

export interface MediaPlayer {
  durationNode: any
  player: any
  progressBarWidth: any
}

const getPlaybackRateText = num => {
  switch (num) {
    case 0.5:
      return '0.5x'
    case 0.75:
      return '0.75x'
    case 1:
      return '1x'
    case 1.25:
      return '1.25x'
    case 1.5:
      return '1.5x'
    case 2:
      return '2x'
    default:
      return '1x'
  }
}

const changePlaybackRate = num => {
  switch (num) {
    case 0.5:
      return 0.75
    case 0.75:
      return 1
    case 1:
      return 1.25
    case 1.25:
      return 1.5
    case 1.5:
      return 2
    case 2:
      return 0.5
    default:
      return 1
  }
}

const timePlaceholder = '-:--:--'

export class MediaPlayer extends React.Component<Props, State> {

  static defaultProps: Props = {
    autoplay: false,
    playbackRate: 1,
    playing: false,
    showAutoplay: true,
    showTimeJumpBackward: false
  }

  constructor (props) {
    super(props)

    this.state = {
      autoplay: props.autoplay || false,
      clipEndFlagPositionX: -1,
      clipFinished: false,
      clipStartFlagPositionX: -1,
      duration: null,
      isClientSide: false,
      openAddToModal: false,
      openMakeClipModal: false,
      openQueueModal: false,
      openShareModal: false,
      playbackRate: props.playbackRate || 1,
      played: 0,
      playedSeconds: 0,
      playing: props.playing || props.autoplay || false,
      progressPreviewTime: -1,
      seeking: false
    }

    this.durationNode = React.createRef()
    this.progressBarWidth = React.createRef()
  }

  componentDidMount () {
    document.body.addEventListener('keydown', (event) => {
      if (event.keyCode === keyLeftArrow) {
        this.player.seekTo(this.player.getCurrentTime() - 5)
      } else if (event.keyCode === keyRightArrow) {
        this.player.seekTo(this.player.getCurrentTime() + 5)
      }
    })

    this.setState({ isClientSide: true })
  }

  playerRef = player => {
    this.player = player
  }

  playPause = e => {
    this.setState({ playing: !this.state.playing })
  }

  setCurrentTime = e => {
    const offsetX = e.nativeEvent.offsetX
    const width = e.currentTarget.offsetWidth
    this.player.seekTo(offsetX / width)
  }

  setPlaybackRate = e => {
    this.setState({
      playbackRate: changePlaybackRate(this.state.playbackRate)
    })
  }

  getClipFlagPositions = (): ClipFlagPositions => {
    const { clipEndTime, clipStartTime } = this.props
    const { duration } = this.state
    let clipEndFlagPositionX = -1
    let clipStartFlagPositionX = -1

    if (this.progressBarWidth.current) {
      const width = this.progressBarWidth.current.offsetWidth

      if (duration && this.durationNode.current.innerText !== timePlaceholder) {
        const positionOffset = width / duration

        if (clipStartTime) {
          clipStartFlagPositionX = (clipStartTime * positionOffset) - 1
        }

        if (clipStartTime && clipEndTime) {
          clipEndFlagPositionX = (clipEndTime * positionOffset) + 1
        }
      }
    }

    return {
      clipEndFlagPositionX,
      clipStartFlagPositionX
    }
  }

  onAutoplay = () => {
    const { handleOnAutoplay } = this.props
    const { autoplay } = this.state

    if (handleOnAutoplay) {
      handleOnAutoplay(!autoplay)
    }

    this.setState({ autoplay: !autoplay })
  }

  onDuration = (duration) => {
    const { clipStartTime } = this.props
    if (clipStartTime && clipStartTime > 0) {
      this.player.seekTo(clipStartTime)
    }
    this.setState({ duration })
  }

  onPlay = () => {
    const { clipEndTime, handleOnPastClipTime } = this.props
    const { clipFinished } = this.state

    if (clipEndTime && clipFinished && this.player.getCurrentTime() > clipEndTime && handleOnPastClipTime) {
      handleOnPastClipTime()
      return
    }
  }

  onPause = () => {
    this.setState({ playing: false })
  }

  onMouseOverProgress = e => {
    const offsetX = e.nativeEvent.offsetX
    const width = e.currentTarget.offsetWidth
    const { duration } = this.state

    if (duration) {
      const previewTime = duration * (offsetX / width)
      this.setState({
        progressPreviewTime: previewTime
      })
    }
  }

  onMouseOutProgress = e => {
    this.setState({
      progressPreviewTime: -1
    })
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onSeekMouseUp = e => {
    this.setState({ seeking: false })
  }

  onProgress = state => {
    const { clipEndTime } = this.props
    const { clipFinished, seeking } = this.state

    if (clipEndTime && !clipFinished && this.player.getCurrentTime() > clipEndTime) {
      this.setState({
        clipFinished: true,
        playing: false
      })
      return
    }

    if (!seeking) {
      this.setState(state)
    }
  }

  showAddToModal = () => {
    this.setState({ openAddToModal: true })
  }

  showMakeClipModal = () => {
    this.setState({ openMakeClipModal: true })
  }

  showQueueModal = () => {
    this.setState({ openQueueModal: true })
  }

  showShareModal = () => {
    this.setState({ openShareModal: true })
  }

  hideAddToModal = () => {
    this.setState({ openAddToModal: false })
  }

  hideMakeClipModal = () => {
    this.setState({ openMakeClipModal: false })
  }

  hideQueueModal = () => {
    this.setState({ openQueueModal: false })
  }

  hideShareModal = () => {
    this.setState({ openShareModal: false })
  }

  render () {
    const { clipEndTime, clipStartTime, clipTitle, episodeMediaUrl, episodeTitle,
      handleAddTo, handleMakeClip, handleOnEpisodeEnd, handleOnSkip,
      handleOnTimeJumpBackward, handleOnTimeJumpForward, imageUrl, playerClipLink,
      playerEpisodeLink, playerPodcastLink, podcastTitle, showAutoplay,
      showTimeJumpBackward } = this.props
    const { duration, isClientSide, openAddToModal, openMakeClipModal, openQueueModal,
      openShareModal, playbackRate, played, playedSeconds, playing,
      progressPreviewTime } = this.state

    const { clipEndFlagPositionX, clipStartFlagPositionX } = this.getClipFlagPositions()
    const currentTime = this.player ? this.player.getCurrentTime() : 0

    return (
      <React.Fragment>
        {
          isClientSide &&
            <FilePlayer
              muted={false}
              onDuration={this.onDuration}
              onEnded={handleOnEpisodeEnd}
              onPlay={this.onPlay}
              onProgress={this.onProgress}
              playbackRate={playbackRate}
              playing={playing}
              ref={this.playerRef}
              style={{ display: 'none' }}
              url={episodeMediaUrl}
              volume={1} />
        }
        <div className='mp-headline'>
          <div className='mp-headline__inner'>
            <a
              className='mp-headline__link'
              { ... playerClipLink &&
                { href: playerClipLink }
              }>
              <div className='mp-headline__title'>
                {clipTitle}
              </div>
              <div className='mp-headline__time'>
                {readableClipTime(clipStartTime, clipEndTime)}
              </div>
            </a>
          </div>
        </div>
        <div className='mp-header'>
          <div className='mp-header__inner'>
            <a
              className='mp-header__link'
              {
                ... playerEpisodeLink &&
                  { href: playerEpisodeLink }
              }>
              <img
                className='mp-header__image'
                src={imageUrl} />
              <div className='mp-header__wrap'>
                <div className='mp-header-wrap__top'>
                  {podcastTitle}
                </div>
                <div className='mp-header-wrap__bottom'>
                  {episodeTitle}
                </div>
              </div>
            </a>
            <button
              className='mp-header__add'
              onClick={this.showAddToModal}>
              <FontAwesomeIcon icon='plus-circle' />
            </button>
            {
              handleMakeClip &&
                <button
                  className='mp-header__clip'
                  onClick={this.showMakeClipModal}>
                  <FontAwesomeIcon icon='cut' />
                </button>
            }
            <button
              className='mp-header__queue'
              onClick={this.showQueueModal}>
              <FontAwesomeIcon icon='list-ul' />
            </button>
            <button
              className='mp-header__share'
              onClick={this.showShareModal}>
              <FontAwesomeIcon icon='share' />
            </button>
          </div>
        </div>
        <div className='mp'>
          <div className='mp__inner'>
            <button
              className='mp__play-pause'
              onClick={this.playPause}>
              {
                playing ?
                  <FontAwesomeIcon icon='pause' /> :
                  <FontAwesomeIcon icon='play' />
              }
            </button>
            <span className='mp__current-time'>
              {convertSecToHHMMSS(playedSeconds)}
            </span>
            <div
              className='mp__progress-bar-wrapper'
              data-iscapture='true'
              data-tip
              ref={this.progressBarWidth}>
              <div
                className='mp-progress-bar__clip-start'
                style={{
                  display: `${clipStartFlagPositionX! > -1 && duration ? 'block' : 'none'}`,
                  left: `${clipStartFlagPositionX}px`
                }} />
              <div
                className='mp-progress-bar__clip-end'
                style={{
                  display: `${clipEndFlagPositionX! > -1 && duration ? 'block' : 'none'}`,
                  left: `${clipEndFlagPositionX}px`
                }} />
              <ReactTooltip
                className='mp-progress-bar__preview'>
                {convertSecToHHMMSS(progressPreviewTime)}
              </ReactTooltip>
              <Progress
                className='mp__progress-bar'
                onClick={this.setCurrentTime}
                onMouseMove={this.onMouseOverProgress}
                value={played * 100} />
            </div>
            <span
              className='mp__duration'
              ref={this.durationNode}>
              {
                duration ? convertSecToHHMMSS(duration) : timePlaceholder
              }
            </span>
            {
              (showTimeJumpBackward && handleOnTimeJumpBackward) &&
              <button
              className='mp__time-jump-backward'
              onClick={handleOnTimeJumpBackward}>
                  <FontAwesomeIcon icon='undo-alt' />
                </button>
            }
            <button
              className='mp__time-jump-forward'
              onClick={handleOnTimeJumpForward}>
              <FontAwesomeIcon icon='redo-alt' />
            </button>
            <button
              className='mp__playback-rate'
              onClick={this.setPlaybackRate}>
              {getPlaybackRateText(playbackRate)}
            </button>
            {
              (showAutoplay) &&
              <button
              className='mp__autoplay'
              onClick={this.onAutoplay}>
                  <FontAwesomeIcon icon='infinity' />
                </button>
            }
            <button
              className='mp__skip'
              onClick={handleOnSkip}>
              <FontAwesomeIcon icon='step-forward' />
            </button>
          </div>
        </div>
        {
          (openAddToModal && handleAddTo) &&
            <AddToModal
              hideModal={this.hideAddToModal}
              isOpen={openAddToModal} />

        }
        {
          (openMakeClipModal && handleMakeClip) &&
            <MakeClipModal
              handleSubmit={handleMakeClip}
              hideModal={this.hideMakeClipModal}
              isPublic={true}
              isOpen={openMakeClipModal}
              startTime={currentTime} />
        }
        <QueueModal
          hideModal={this.hideQueueModal}
          isOpen={openQueueModal} />
        <ShareModal
          hideModal={this.hideShareModal}
          isOpen={openShareModal}
          playerClipLink={playerClipLink}
          playerEpisodeLink={playerEpisodeLink}
          playerPodcastLink={playerPodcastLink} />
      </React.Fragment>
    )
  }
}
