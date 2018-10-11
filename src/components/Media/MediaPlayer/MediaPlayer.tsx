import * as React from 'react'
import FilePlayer from 'react-player/lib/players/FilePlayer'
import { Progress } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  autoplay: boolean
  clipEndTime: number
  clipStartTime: number
  height: string
  muted: boolean
  onPrevious: (event: React.MouseEvent<HTMLButtonElement>) => void
  onSkip: (event: React.MouseEvent<HTMLButtonElement>) => void
  playbackRate: number
  playing: boolean
  url: string
  volume: number
  width: string
}

type State = {
  muted: boolean
  playbackRate: number
  playing: boolean
  seeking: boolean
  volume: number
}

export interface MediaPlayer {
  player: any
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

export class MediaPlayer extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      muted: props.muted || false,
      playbackRate: props.playbackRate || 1,
      playing: props.playing || props.autoplay || false,
      seeking: false,
      volume: props.volume || 1
    }
  }

  ref = player => {
    this.player = player
  }

  playPause = e => {
    this.setState({ playing: !this.state.playing })
  }

  setPlaybackRate = e => {
    this.setState({
      playbackRate: changePlaybackRate(this.state.playbackRate)
    })
  }

  setVolume = e => {
    const offsetX = e.nativeEvent.offsetX
    this.setState({ volume: offsetX * 2 / 100 })
  }

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  onReady = () => {
    console.log('onReady')
  }

  onDuration = () => {
    console.log('onDuration')
  }

  onPlay = () => {
    this.setState({ playing: true })
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
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onEnded = () => {
    console.log('onEnded')
  }

  render () {
    const { onPrevious, onSkip, url } = this.props
    const { muted, playbackRate, playing, volume } = this.state

    return (
      <React.Fragment>
        <FilePlayer
          muted={muted}
          playbackRate={playbackRate}
          playing={playing}
          ref={this.ref}
          url={url}
          volume={volume} />
        <div className='media-player'>
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
            12:34:56
          </span>
          <Progress
            className='media-player__progress-bar'
            value={25} />
          <span className='media-player__duration'>
            12:34:56
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
            onClick={onPrevious}>
            <FontAwesomeIcon icon='step-backward' />
          </button>
          <button
            className='media-player__skip'
            onClick={onSkip}>
            <FontAwesomeIcon icon='step-forward' />
          </button>
        </div>
      </React.Fragment>
    )
  }

}
