import * as React from 'react'
import FilePlayer from 'react-player/lib/players/FilePlayer'
import { Progress } from 'reactstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as ReactTooltip from 'react-tooltip'
import { keyLeftArrow, keyRightArrow } from 'lib/constants'
import { NowPlayingItem } from 'lib/nowPlayingItem'
import { convertSecToHHMMSS } from 'lib/utility'

declare global {
  interface Window { player: any }
}

type Props = {
  autoplay?: boolean
  clipFinished?: boolean
  duration: number | null
  handleClipRestart?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleItemSkip?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleOnEpisodeEnd?: Function
  handleOnPastClipTime?: Function
  handleQueueItemClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePause?: Function
  handlePlaybackRateClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleSetPlayedAfterClipFinished?: Function
  handleToggleAddToModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleAutoplay?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleMakeClipModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleTogglePlay?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleQueueModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleShareModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  hasItemInQueue?: boolean
  isLoggedIn?: boolean
  nowPlayingItem: NowPlayingItem
  playbackRate: number
  playbackRateText: string
  playedAfterClipFinished?: boolean
  playerClipLinkAs?: string
  playerClipLinkHref?: string
  playerClipLinkOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  playerEpisodeLinkAs?: string
  playerEpisodeLinkHref?: string
  playerEpisodeLinkOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  playerPodcastLinkAs?: string
  playerPodcastLinkHref?: string
  playing?: boolean
  playlists: any[]
  queuePriorityItems: NowPlayingItem[]
  queueSecondaryItems: NowPlayingItem[]
  showAutoplay?: boolean
}

type State = {
  clipEndFlagPositionX?: number
  clipStartFlagPositionX?: number
  duration: number | null
  isClientSide: boolean
  isLoading: boolean
  openAddToModal: boolean
  openMakeClipModal: boolean
  openQueueModal: boolean
  openShareModal: boolean
  played: number
  playedSeconds: number
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

let lastNowPlayingItem: NowPlayingItem = {}

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

export class MediaPlayer extends React.Component<Props, State> {

  static defaultProps: Props = {
    duration: null,
    nowPlayingItem: {},
    queuePriorityItems: [],
    queueSecondaryItems: [],
    playbackRate: 1,
    playbackRateText: '1x',
    playing: false,
    playlists: [],
    showAutoplay: true
  }

  constructor (props) {
    super(props)

    this.state = {
      clipEndFlagPositionX: -1,
      clipStartFlagPositionX: -1,
      duration: null,
      isClientSide: false,
      isLoading: true,
      openAddToModal: false,
      openMakeClipModal: false,
      openQueueModal: false,
      openShareModal: false,
      played: 0,
      playedSeconds: 0,
      progressPreviewTime: -1,
      seeking: false
    }

    this.durationNode = React.createRef()
    this.progressBarWidth = React.createRef()

    this.timeJumpForward = this.timeJumpForward.bind(this)
  }

  componentDidMount () {
    this.setKeyboardEventListeners()
    this.setState({ isClientSide: true })
  }

  componentWillReceiveProps (nextProps) {
    const lastItem = this.props.nowPlayingItem || {}
    const nextItem = nextProps.nowPlayingItem || {}

    // If still the same episode, don't wait for the onDuration method
    if (lastItem.episodeId !== nextItem.episodeId) {
      this.setState({ duration: null })
    }

    // If the same clip is played back-to-back after an item skip,
    // force refresh of the player to the clipStartTime
    if (typeof window !== 'undefined'
        && window.player
        && lastItem !== nextItem
        && lastItem.clipId === nextItem.clipId) {
      window.player.seekTo(nextItem && nextItem.clipStartTime && Math.floor(nextItem.clipStartTime))
    }

    // If the same episode is played back-to-back after an item skip,
    // force refresh of the player to the beginning.
    if (typeof window !== 'undefined'
      && window.player
      && lastItem !== nextItem
      && lastItem.episodeId === nextItem.episodeId) {
      window.player.seekTo(0)
    }
  }

  setKeyboardEventListeners () {
    document.body.addEventListener('keydown', (event) => {
      if (typeof window !== 'undefined' && window.player) {
        if (event.keyCode === keyLeftArrow) {
          window.player.seekTo(Math.floor(window.player.getCurrentTime()) - 5)
          this.forceUpdate() // Force update so the time updates immediately
        } else if (event.keyCode === keyRightArrow) {
          window.player.seekTo(Math.floor(window.player.getCurrentTime()) + 5)
          this.forceUpdate() // Force update so the time updates immediately
        }
      }
    })
  }

  playerRef = player => {
    if (typeof window !== 'undefined') {
      window.player = player
    }
  }

  setCurrentTime = e => {
    const offsetX = parseFloat(e.nativeEvent.offsetX)
    const width = parseFloat(e.currentTarget.offsetWidth)
    if (typeof window !== 'undefined' && window.player) {
      window.player.seekTo((offsetX / width).toFixed(2))
    }
  }

  getClipFlagPositions = (): ClipFlagPositions => {
    const { nowPlayingItem } = this.props
    const { clipEndTime, clipStartTime } = nowPlayingItem
    const { duration } = this.state

    let clipEndFlagPositionX = -1
    let clipStartFlagPositionX = -1

    if (this.progressBarWidth.current) {
      const width = this.progressBarWidth.current.offsetWidth

      if (duration && duration > 0) {
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

  timeJumpForward = () => {
    if (typeof window !== 'undefined' && window.player) {
      window.player.seekTo(Math.floor(window.player.getCurrentTime()) + 15)
      this.forceUpdate()
    }
  }

  clipRestart = () => {
    const { nowPlayingItem } = this.props
    const { clipStartTime } = nowPlayingItem
    if (typeof window !== 'undefined' && window.player && clipStartTime) {
      window.player.seekTo(Math.floor(clipStartTime))
    }
    this.forceUpdate()
  }

  itemSkip = (evt) => {
    if (this.props.handleItemSkip) {
      this.setState({
        isLoading: true,
        played: 0,
        playedSeconds: 0
      })
      this.props.handleItemSkip(evt)
    }
  }

  onDuration = (duration) => {
    const { nowPlayingItem } = this.props
    const { clipStartTime } = nowPlayingItem

    this.setState({
      duration,
      isLoading: false
    })

    if (typeof window !== 'undefined' && window.player && clipStartTime && clipStartTime > 0) {
      window.player.seekTo(Math.floor(clipStartTime))
    }

    this.forceUpdate()
  }

  onPlay = () => {
    const { clipFinished, handleOnPastClipTime, handleSetPlayedAfterClipFinished,
      nowPlayingItem } = this.props
    const { clipEndTime } = nowPlayingItem

    if (clipEndTime && clipFinished && typeof window !== 'undefined' && window.player.getCurrentTime() > clipEndTime && handleOnPastClipTime) {
      handleOnPastClipTime(true)
    }

    if (clipEndTime && clipFinished && typeof window !== 'undefined' && window.player.getCurrentTime() > clipEndTime && handleSetPlayedAfterClipFinished) {
      handleSetPlayedAfterClipFinished()
    }
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

  onSeekMouseDown = () => {
    this.setState({ seeking: true })
  }

  onSeekMouseUp = () => {
    this.setState({ seeking: false })
  }

  onProgress = state => {
    const { autoplay, handleOnPastClipTime, handlePause, handleSetPlayedAfterClipFinished,
      nowPlayingItem, playedAfterClipFinished, playing } = this.props
    const { clipEndTime } = nowPlayingItem
    const { seeking } = this.state

    if (clipEndTime && !playedAfterClipFinished && typeof window !== 'undefined' && window.player.getCurrentTime() > clipEndTime && playing) {
      if (handleOnPastClipTime) {
        handleOnPastClipTime()

        if (autoplay && handleSetPlayedAfterClipFinished) {
          handleSetPlayedAfterClipFinished()
        }
      }

      if (!autoplay && handlePause) {
        handlePause()
      }
    }

    if (!seeking) {
      this.setState(state)
    }
  }

  render () {
    const { autoplay, handleOnEpisodeEnd, handlePlaybackRateClick, handleToggleAutoplay,
      handleToggleAddToModal, handleToggleMakeClipModal, handleToggleQueueModal,
      handleToggleShareModal, handleTogglePlay, hasItemInQueue, nowPlayingItem,
      playbackRate, playbackRateText, playedAfterClipFinished, playerClipLinkAs,
      playerClipLinkHref, playerClipLinkOnClick, playerEpisodeLinkAs, playerEpisodeLinkHref,
      playerEpisodeLinkOnClick, playing,
      showAutoplay } = this.props

    const { duration, isClientSide, isLoading, openAddToModal, openMakeClipModal,
      openQueueModal, openShareModal, progressPreviewTime } = this.state

    const { clipEndTime, clipId, clipStartTime, clipTitle, episodeMediaUrl, episodeTitle,
      podcastImageUrl, podcastTitle } = nowPlayingItem

    let isLoadingOverride = isLoading
    // If the new NowPlayingItem is the same episode as the last one, but it is a
    // different clip, then make the player seek to the new clipStartTime
    if (clipStartTime &&
        lastNowPlayingItem.episodeMediaUrl === episodeMediaUrl &&
        (lastNowPlayingItem.clipEndTime !== clipEndTime ||
        lastNowPlayingItem.clipStartTime !== clipStartTime ||
        lastNowPlayingItem.clipTitle !== clipTitle ||
        lastNowPlayingItem.clipId !== clipId) &&
        typeof window !== 'undefined' && window.player) {
      window.player.seekTo(Math.floor(clipStartTime))
    } else if (lastNowPlayingItem === nowPlayingItem) {
      isLoadingOverride = false
    }

    // Force ReactPlayer to reload if it receives a new mediaUrl, set loading state,
    // and clear clip flags.
    if (hasMediaUrlChanged(episodeMediaUrl)) {
      incrementReactPlayerKey()
    }

    let { clipEndFlagPositionX, clipStartFlagPositionX } = this.getClipFlagPositions()

    lastNowPlayingItem = nowPlayingItem

    const isClip = clipId && !playedAfterClipFinished ? true : false

    const headerLink = (
      <Link
        {...(isClip && playerClipLinkAs ? { as: playerClipLinkAs } : {})}
        {...(isClip && playerClipLinkHref ? { href: playerClipLinkHref } : {})}
        {...(!isClip && playerEpisodeLinkAs ? { as: playerEpisodeLinkAs } : {})}
        {...(!isClip && playerEpisodeLinkHref ? { href: playerEpisodeLinkHref } : {})}>
        <a
          className='mp-header__link'
          {
            ...playerEpisodeLinkOnClick &&
            { ...(!isClip ? { onClick: playerEpisodeLinkOnClick } : {}) }
          }
          {
            ...playerClipLinkOnClick &&
            { ...(isClip ? { onClick: playerClipLinkOnClick } : {}) }
          }
        >
          <img
            className='mp-header__image'
            src={podcastImageUrl} />
          <div className='mp-header__wrap'>
            <div className='mp-header-wrap__top'>
              {podcastTitle}
            </div>
            <div className='mp-header-wrap__bottom'>
              {episodeTitle}
            </div>
          </div>
        </a>
      </Link>
    )

    console.log('asdf ', reactPlayerKey)
    console.log('derrrr ', window.player && window.player.getCurrentTime())

    return (
      nowPlayingItem.episodeMediaUrl ?
        <div className='mp'>
          {
            isClientSide &&
              <FilePlayer
                key={reactPlayerKey}
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
          <div className='mp__header'>
            <div className='mp-header__inner'>
              {headerLink}
              <button
                className={`mp-header__queue ${openQueueModal ? 'active' : ''}`}
                onClick={handleToggleQueueModal}>
                <FontAwesomeIcon icon='list-ul' />
              </button>
              <button
                className={`mp-header__clip ${openMakeClipModal ? 'active' : ''}`}
                onClick={handleToggleMakeClipModal}>
                <FontAwesomeIcon icon='cut' />
              </button>
              <button
                className={`mp-header__add ${openAddToModal ? 'active' : ''}`}
                onClick={handleToggleAddToModal}>
                <FontAwesomeIcon icon='plus-circle' />
              </button>
              <button
                className={`mp-header__share ${openShareModal ? 'active' : ''}`}
                onClick={handleToggleShareModal}>
                <FontAwesomeIcon icon='share' />
              </button>
            </div>
          </div>
          <div className='mp__player'>
            <div className='mp-player__inner'>
              <button
                className='mp-player__play-pause'
                onClick={handleTogglePlay}>
                {
                  playing ?
                    <FontAwesomeIcon icon='pause' /> :
                    <FontAwesomeIcon icon='play' />
                }
              </button>
              <div
                className='mp-player__progress-bar-wrapper'
                data-iscapture='true'
                data-tip
                ref={this.progressBarWidth}>
                {
                  (!isLoadingOverride && duration) &&
                    <span className={`mp-player__current-time`}>
                      {convertSecToHHMMSS(typeof window !== 'undefined' && window.player.getCurrentTime())}
                    </span>
                }
                {
                  !playedAfterClipFinished &&
                    <React.Fragment>
                      <div
                        className='mp-progress-bar__clip-start'
                        style={{
                          display: `${clipStartFlagPositionX! > -1 && duration && !isLoadingOverride ? 'block' : 'none'}`,
                          left: `${clipStartFlagPositionX}px`
                        }} />
                      <div
                        className='mp-progress-bar__clip-end'
                        style={{
                          display: `${clipEndFlagPositionX! > -1 && duration && !isLoadingOverride ? 'block' : 'none'}`,
                          left: `${clipEndFlagPositionX}px`
                        }} />
                    </React.Fragment>
                }
                <ReactTooltip
                  className='mp-progress-bar__preview'>
                  {convertSecToHHMMSS(progressPreviewTime)}
                </ReactTooltip>
                <Progress
                  className='mp-player__progress-bar'
                  onClick={this.setCurrentTime}
                  onMouseMove={this.onMouseOverProgress}
                  value={duration && typeof window !== 'undefined' && window.player ? ((window.player.getCurrentTime() / duration) * 100).toFixed(5) : 0} />
                <span
                  className={`mp-player__duration`}
                  ref={this.durationNode}>
                  {
                    (!isLoadingOverride && duration) &&
                      convertSecToHHMMSS(duration)
                  }
                </span>
              </div>
              <button
                className='mp-player__time-jump-forward'
                onClick={this.timeJumpForward}>
                <FontAwesomeIcon icon='redo-alt' />
              </button>
              <button
                className='mp-player__playback-rate'
                onClick={handlePlaybackRateClick}>
                {playbackRateText}
              </button>
              {
                (showAutoplay) &&
                <button
                className={`mp-player__autoplay ${autoplay ? 'active' : ''}`}
                onClick={handleToggleAutoplay}>
                    <FontAwesomeIcon icon='infinity' />
                  </button>
              }
              <button
                className='mp-player__skip'
                disabled={!hasItemInQueue}
                onClick={this.itemSkip}>
                <FontAwesomeIcon icon='step-forward' />
              </button>
            </div>
          </div>
        </div> : <React.Fragment></React.Fragment>
    )
  }
}
