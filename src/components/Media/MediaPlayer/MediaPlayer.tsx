import * as React from 'react'
import FilePlayer from 'react-player/lib/players/FilePlayer'
import { Progress, Tooltip } from 'reactstrap'
import Link from 'next/link'
import { NowPlayingItem } from 'podverse-shared'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keyLeftArrow, keyRightArrow } from 'lib/constants'
import { convertSecToHHMMSS } from 'lib/utility'
import { PVImage } from 'components/PVImage/PVImage'

declare global {
  interface Window { player: any }
}

type Props = {
  autoplay?: boolean
  clipFinished?: boolean
  didWaitToLoad: boolean
  duration: number | null
  handleClipRestart?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleItemSkip?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleOnEpisodeEnd?: Function
  handleOnPastClipTime?: Function
  handleQueueItemClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePause?: Function
  handlePlaybackRateClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleSetPlayedAfterClipFinished?: Function
  handletoggleAddToPlaylistModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleAutoplay?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleMakeClipModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleTogglePlay?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleShareModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleSupportModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
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
  showAutoplay?: boolean
  showPlaybackSpeed?: boolean
  showSupport?: boolean
}

type State = {
  clipEndFlagPositionX: number
  clipStartFlagPositionX: number
  duration: number | null
  isClientSide: boolean
  isLoading: boolean
  played: number
  playedSeconds: number
  progressPreviewTime: number
  seeking: boolean
  tooltipIsOpen: boolean
  tooltipOffsetX: number
}

type ClipFlagPositions = {
  clipEndFlagPositionX: number
  clipStartFlagPositionX: number
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
    didWaitToLoad: false,
    duration: null,
    nowPlayingItem: {},
    queuePriorityItems: [],
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
      played: 0,
      playedSeconds: 0,
      progressPreviewTime: -1,
      seeking: false,
      tooltipIsOpen: false,
      tooltipOffsetX: 0
    }

    this.durationNode = React.createRef()
    this.progressBarWidth = React.createRef()
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
        && lastItem.clipId
        && lastItem.clipId === nextItem.clipId) {
      window.player.seekTo(nextItem && nextItem.clipStartTime && Math.floor(nextItem.clipStartTime))
    // If the same episode is played back-to-back after an item skip,
    // force refresh of the player to the beginning.
    } else if (typeof window !== 'undefined'
      && window.player
      && lastItem !== nextItem
      && lastItem.episodeId && !nextItem.clipId
      && lastItem.episodeId === nextItem.episodeId) {
      window.player.seekTo(0)
    }
  }

  setKeyboardEventListeners () {
    document.body.addEventListener('keydown', (event) => {
      if (
        typeof window !== 'undefined' && window.player
        && document.activeElement && document.activeElement.nodeName !== 'TEXTAREA' &&
        document.activeElement.nodeName !== 'INPUT'
      ) {
        if (event.keyCode === keyLeftArrow) {
          window.player.seekTo(Math.floor(window.player.getCurrentTime()) - 5)
          this.forceUpdate()
        } else if (event.keyCode === keyRightArrow) {
          window.player.seekTo(Math.floor(window.player.getCurrentTime()) + 5)
          this.forceUpdate()
        }
      }
    })
  }

  playerRef = player => {
    if (typeof window !== 'undefined') {
      window.player = player
      return player
    }
  }

  setCurrentTime = e => {
    const { progressPreviewTime } = this.state
    if (typeof window !== 'undefined' && window.player && progressPreviewTime >= 0) {
      window.player.seekTo(progressPreviewTime)
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

  timeJumpBackward = () => {
    if (typeof window !== 'undefined' && window.player) {
      window.player.seekTo(Math.floor(window.player.getCurrentTime()) - 30)
      this.forceUpdate()
    }
  }

  timeJumpForward = () => {
    if (typeof window !== 'undefined' && window.player) {
      window.player.seekTo(Math.floor(window.player.getCurrentTime()) + 30)
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

  itemSkip = evt => {
    if (this.props.handleItemSkip) {
      this.setState({
        isLoading: true,
        played: 0,
        playedSeconds: 0
      })
      this.props.handleItemSkip(evt)
    }
  }

  onDuration = duration => {
    const { nowPlayingItem } = this.props
    const { clipStartTime } = nowPlayingItem

    this.setState({
      duration,
      isLoading: false
    })

    let playbackPosition = 0

    if (nowPlayingItem && nowPlayingItem.userPlaybackPosition && nowPlayingItem.userPlaybackPosition > 0) {
      playbackPosition = nowPlayingItem.userPlaybackPosition || 0
    }

    if (typeof window !== 'undefined' && window.player && clipStartTime && clipStartTime > 0) {
      window.player.seekTo(Math.floor(clipStartTime))
    } else if (typeof window !== 'undefined' && window.player) {
      window.player.seekTo(playbackPosition)
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
      handleSetPlayedAfterClipFinished(true)
    }
  }

  onMouseOutProgress = e => {
    this.setState({
      progressPreviewTime: -1,
      tooltipIsOpen: false
    })
  }

  onMouseOverProgress = e => {
    const offsetX = e.nativeEvent.offsetX
    const width = e.currentTarget.offsetWidth
    const { duration } = this.state

    const handleToolTipToggleEvent = {
      offsetX: e.nativeEvent.offsetX,
      srcElement: e.nativeEvent.srcElement
    }

    if (duration) {
      const previewTime = duration * (offsetX / width)
      this.setState({
        progressPreviewTime: previewTime
      }, () => {
        this.handleTooltipToggle(handleToolTipToggleEvent)
      })
    }
  }

  onSeekMouseDown = () => {
    this.setState({ seeking: true })
  }

  onSeekMouseUp = () => {
    this.setState({ seeking: false })
  }

  onProgress = state => {
    const { autoplay, handleOnPastClipTime, handlePause, nowPlayingItem,
      playedAfterClipFinished, playing } = this.props
    const { clipEndTime } = nowPlayingItem
    const { seeking } = this.state

    if (clipEndTime && !playedAfterClipFinished && typeof window !== 'undefined' && window.player.getCurrentTime() > clipEndTime && playing) {
      if (handleOnPastClipTime) {
        handleOnPastClipTime()
      }

      if (!autoplay && handlePause && !playedAfterClipFinished) {
        handlePause()
      }
    }

    if (!seeking) {
      this.setState(state)
    }
  }

  handleTooltipToggle = (evt) => {
    const { duration } = this.state

    if (!duration) return

    const { offsetX, srcElement } = evt
    const { offsetWidth } = srcElement
    const middleX = offsetWidth / 2
    const startX = 0 - middleX
    const tooltipOffsetX = startX + offsetX

    this.setState({
      tooltipIsOpen: true,
      tooltipOffsetX
    })
  }

  render () {
    const { autoplay, didWaitToLoad, handleOnEpisodeEnd, handlePlaybackRateClick, handleToggleAutoplay,
      handletoggleAddToPlaylistModal, handleToggleMakeClipModal, handleToggleShareModal,
      handleToggleSupportModal, handleTogglePlay, nowPlayingItem, playbackRate, playbackRateText,
      playedAfterClipFinished, playerClipLinkAs, playerClipLinkHref, playerClipLinkOnClick,
      playerEpisodeLinkAs, playerEpisodeLinkHref, playerEpisodeLinkOnClick, playing, showAutoplay,
      showPlaybackSpeed, showSupport } = this.props

    const { duration, isClientSide, isLoading, progressPreviewTime, tooltipIsOpen,
      tooltipOffsetX } = this.state

    const { clipEndTime, clipId, clipStartTime, clipTitle, episodeImageUrl, episodeMediaUrl,
      episodeTitle, podcastShrunkImageUrl, podcastTitle } = nowPlayingItem

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

    const { clipEndFlagPositionX, clipStartFlagPositionX } = this.getClipFlagPositions()

    lastNowPlayingItem = nowPlayingItem

    const isClip = clipId && !playedAfterClipFinished ? true : false
    const linkHref = isClip ? playerClipLinkHref : playerEpisodeLinkHref
    const linkAs = isClip ? playerClipLinkAs : playerEpisodeLinkAs

    const headerLink = (
      <Link
        as={linkAs || ''}
        href={linkHref || ''}>
        <a
          className='mp-header__link'
          {
            ...playerEpisodeLinkOnClick &&
            { ...(!isClip ? { onClick: playerEpisodeLinkOnClick } : {}) }
          }
          {
            ...playerClipLinkOnClick &&
            { ...(isClip ? { onClick: playerClipLinkOnClick } : {}) }
          }>
          <div className='mp-header__image'>
            <PVImage
              height='48px'
              imageUrl={episodeImageUrl || podcastShrunkImageUrl}
              width='48px' />
          </div>
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

    return (
      nowPlayingItem.episodeMediaUrl ?
        <div className='mp'>
          {
            isClientSide && didWaitToLoad &&
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
              {
                showSupport &&
                  <button
                    className='mp-header__funding'
                    onClick={handleToggleSupportModal}>
                    <FontAwesomeIcon icon='donate' />
                  </button>
              }
              <button
                className='mp-header__make-clip'
                onClick={handleToggleMakeClipModal}>
                <FontAwesomeIcon icon='cut' />
              </button>
              <button
                className='mp-header__add-to'
                onClick={handletoggleAddToPlaylistModal}>
                <FontAwesomeIcon icon='plus' />
              </button>
              <button
                className='mp-header__share'
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
              <Tooltip
                isOpen={tooltipIsOpen}
                offset={tooltipOffsetX + ', 4'}
                target='progress-bar-wrapper'
                toggle={this.handleTooltipToggle}
                trigger='hover'>
                <p>{convertSecToHHMMSS(progressPreviewTime)}</p>
              </Tooltip>
              <div
                className='mp-player__progress-bar-wrapper'
                id='progress-bar-wrapper'
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
                          display: `${clipStartFlagPositionX > -1 && duration && !isLoadingOverride ? 'block' : 'none'}`,
                          left: `${clipStartFlagPositionX}px`
                        }} />
                      <div
                        className='mp-progress-bar__clip-end'
                        style={{
                          display: `${clipEndFlagPositionX > -1 && duration && !isLoadingOverride ? 'block' : 'none'}`,
                          left: `${clipEndFlagPositionX}px`
                        }} />
                    </React.Fragment>
                }
                <Progress
                  className='mp-player__progress-bar'
                  onClick={this.setCurrentTime}
                  onMouseMove={this.onMouseOverProgress}
                  onMouseOut={this.onMouseOutProgress}
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
                className='mp-player__time-jump-backward'
                onClick={this.timeJumpBackward}>
                <FontAwesomeIcon icon='undo-alt' />
              </button>
              <button
                className='mp-player__time-jump-forward'
                onClick={this.timeJumpForward}>
                <FontAwesomeIcon icon='redo-alt' />
              </button>
              {
                showPlaybackSpeed &&
                  <button
                    className='mp-player__playback-rate'
                    onClick={handlePlaybackRateClick}>
                    {playbackRateText}
                  </button>
              }
              {
                showAutoplay &&
                <button
                className={`mp-player__autoplay ${autoplay ? 'active' : ''}`}
                onClick={handleToggleAutoplay}>
                    <FontAwesomeIcon icon='infinity' />
                  </button>
              }
              <button
                className='mp-player__skip-track'
                onClick={this.itemSkip}>
                <FontAwesomeIcon icon='step-forward' />
              </button>
            </div>
          </div>
        </div> : <React.Fragment></React.Fragment>
    )
  }
}
