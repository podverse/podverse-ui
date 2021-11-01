import { NowPlayingItem } from 'podverse-shared'
import * as React from 'react'
import FilePlayer from 'react-player/lib/players/FilePlayer'

type Props = {
  handleOnEpisodeEnd: any
  nowPlayingItem: NowPlayingItem
  onDuration: any
  onPlay: any
  onProgress: any
  playbackRate: number
  playing?: boolean
}

type State = {

}

// Force ReactPlayer to refresh every time the mediaUrl changes, to ensure
// playback behavior handles properly.
let mediaUrl
let reactPlayerKey = 0
const incrementReactPlayerKey = () => reactPlayerKey++
const hasMediaUrlChanged = (newUrl) => {
  if (!mediaUrl) {
    mediaUrl = newUrl
    return false
  } else {
    const hasChanged = mediaUrl !== newUrl
    mediaUrl = newUrl
    return hasChanged
  }
}

export class AudioPlayer extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {}
  }

  playerRef = player => {
    if (typeof window !== 'undefined') {
      window.player = player
      return player
    }
  }

  render() {
    const { handleOnEpisodeEnd, nowPlayingItem, onDuration, onPlay, onProgress,
      playbackRate, playing } = this.props

    const { episodeMediaUrl } = nowPlayingItem

    // Force ReactPlayer to reload if it receives a new mediaUrl, set loading state,
    // and clear clip flags.
    if (hasMediaUrlChanged(episodeMediaUrl)) {
      incrementReactPlayerKey()
    }

    return (
      <FilePlayer
        key={reactPlayerKey}
        muted={false}
        onDuration={onDuration}
        onEnded={handleOnEpisodeEnd}
        onPlay={onPlay}
        onProgress={onProgress}
        playbackRate={playbackRate}
        playing={playing}
        ref={this.playerRef}
        style={{ display: 'none' }}
        url={episodeMediaUrl}
        volume={1} />
    )
  }
}
