import * as React from 'react'
import FilePlayer from 'react-player/lib/players/FilePlayer'
import { Progress } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keyLeftArrow, keyRightArrow } from 'lib/constants'
import { convertSecToHHMMSS } from 'lib/util'
import TrackVisibility from 'react-on-screen'

type Props = {
  autoplay: boolean
  clipEndTime: number
  clipStartTime: number
  handleOnEpisodeEnd: Function
  handleOnPastClipTime: Function
  handleOnPrevious: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleOnSkip: (event: React.MouseEvent<HTMLButtonElement>) => void
  height: string
  muted: boolean
  playbackRate: number
  playing: boolean
  url: string
  volume: number
  width: string
}

type State = {
  clipEndFlagPositionX?: number
  clipFinished: boolean
  clipStartFlagPositionX?: number
  duration: number | null
  muted: boolean
  playbackRate: number
  played: number
  playedSeconds: number
  playing: boolean
  progressPreviewTime: number
  seeking: boolean
  volume: number
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

// TrackVisibility always sets isVisible to false on
// the initial view render, so ignore for one render cycle.
let hasLoaded = false

export class MediaPlayer extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      clipEndFlagPositionX: -1,
      clipFinished: false,
      clipStartFlagPositionX: -1,
      duration: null,
      muted: props.muted || false,
      playbackRate: props.playbackRate || 1,
      played: 0,
      playedSeconds: 0,
      playing: props.playing || props.autoplay || false,
      progressPreviewTime: -1,
      seeking: false,
      volume: props.volume || 1
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

  setVolume = e => {
    const offsetX = e.nativeEvent.offsetX
    const width = e.currentTarget.offsetWidth
    this.setState({ volume: offsetX / width })
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

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  onDuration = (duration) => {
    const { clipStartTime } = this.props
    if (clipStartTime && clipStartTime > 0) {
      this.player.seekTo(clipStartTime)
    }
    this.setState({ duration })
  }

  onPlay = () => {
    const { handleOnPastClipTime } = this.props
    const { clipFinished } = this.state

    if (clipFinished && this.player.getCurrentTime() > this.props.clipEndTime) {
      handleOnPastClipTime()
      return
    }
  }

  onPause = () => {
    this.setState({ playing: false })
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onSeekMouseUp = e => {
    this.setState({ seeking: false })
  }

  onProgress = state => {
    const { clipFinished, seeking } = this.state

    if (!clipFinished && this.player.getCurrentTime() > this.props.clipEndTime) {
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

  onEnded = () => {
    this.props.handleOnEpisodeEnd()
  }

  MediaPlayerComponent = (visibilityObj) => {
    const { isVisible } = visibilityObj
    const { handleOnPrevious, handleOnSkip, url } = this.props
    const { duration, muted, playbackRate, played,
      playedSeconds, playing, progressPreviewTime, volume } = this.state

    const { clipEndFlagPositionX, clipStartFlagPositionX } = this.getClipFlagPositions()

    const mediaPlayerClass = `media-player ${isVisible || !hasLoaded ? '' : 'fixed'}`
    hasLoaded = true

    return (
      <React.Fragment>
        <FilePlayer
          muted={muted}
          onDuration={this.onDuration}
          onEnded={this.onEnded}
          onPlay={this.onPlay}
          onProgress={this.onProgress}
          playbackRate={playbackRate}
          playing={playing}
          ref={this.playerRef}
          style={{ display: 'none' }}
          url={url}
          volume={volume} />
        <div className={`media-player__fixed-spacer ${isVisible ? 'hide' : ''}`}></div>
        <div className={mediaPlayerClass}>
          <button
            className='media-player__play-pause'
            onClick={this.playPause}>
            {
              playing ?
                <FontAwesomeIcon icon='pause' /> :
                <FontAwesomeIcon icon='play' />
            }
          </button>
          <span className='media-player__current-time'>
            {convertSecToHHMMSS(playedSeconds)}
          </span>
          <div
            className='media-player__progress-bar-wrapper'
            ref={this.progressBarWidth}>
            <div
              className='media-player-progress-bar__preview'
              style={{
                display: 'block',
                left: '125px'
              }}>
              {progressPreviewTime}
            </div>
            <div
              className='media-player-progress-bar__clip-start'
              style={{
                display: `${clipStartFlagPositionX! > -1 && duration ? 'block' : 'none'}`,
                left: `${clipStartFlagPositionX}px`
              }} />
            <div
              className='media-player-progress-bar__clip-end'
              style={{
                display: `${clipEndFlagPositionX! > -1 && duration ? 'block' : 'none'}`,
                left: `${clipEndFlagPositionX}px`
              }} />
            <Progress
              className='media-player__progress-bar'
              onClick={this.setCurrentTime}
              value={played * 100} />
          </div>
          <span
            className='media-player__duration'
            ref={this.durationNode}>
            {
              duration ? convertSecToHHMMSS(duration) : timePlaceholder
            }
          </span>
          <button
            className='media-player__mute'
            onClick={this.toggleMuted}>
            {
              muted ?
                <FontAwesomeIcon icon='volume-off' /> :
                <FontAwesomeIcon icon='volume-up' />
            }
          </button>
          <Progress
            className='media-player__volume'
            onClick={this.setVolume}
            value={volume * 100} />
          <button
            className='media-player__playback-rate'
            onClick={this.setPlaybackRate}>
            {getPlaybackRateText(playbackRate)}
          </button>
          <button
            className='media-player__previous'
            onClick={handleOnPrevious}>
            <FontAwesomeIcon icon='step-backward' />
          </button>
          <button
            className='media-player__skip'
            onClick={handleOnSkip}>
            <FontAwesomeIcon icon='step-forward' />
          </button>
        </div>
      </React.Fragment>
    )
  }

  render () {

    return (
      <TrackVisibility>
        <this.MediaPlayerComponent />
      </TrackVisibility>
    )
  }

}