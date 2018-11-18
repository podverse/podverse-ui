import * as React from 'react'
import FilePlayer from 'react-player/lib/players/FilePlayer'
import { Progress } from 'reactstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as ReactTooltip from 'react-tooltip'
import { keyLeftArrow, keyRightArrow } from 'lib/constants'
import { NowPlayingItem } from 'lib/nowPlayingItem'
import { convertSecToHHMMSS } from 'lib/util'
import AddToModal from 'components/Media/Modals/AddToModal/AddToModal'
import MakeClipModal from 'components/Media/Modals/MakeClipModal/MakeClipModal'
import QueueModal from 'components/Media/Modals/QueueModal/QueueModal'
import ShareModal from 'components/Media/Modals/ShareModal/ShareModal'

type Props = {
  autoplay?: boolean
  clipFinished?: boolean
  handleAddToQueueLast?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleAddToQueueNext?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleClipEndTimePreview?: Function
  handleClipRestart?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleClipStartTimePreview?: Function
  handleItemSkip?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleMakeClip?: Function
  handleOnEpisodeEnd?: Function
  handleOnPastClipTime?: Function
  handleQueueItemClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePause?: Function
  handlePlaybackRateClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handlePlaylistCreate?: Function
  handlePlaylistItemAdd?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleSetPlayedAfterClipFinished?: Function
  handleToggleAutoplay?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleTogglePlay?: (event: React.MouseEvent<HTMLButtonElement>) => void
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

const timePlaceholder = '--:--:--'

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

    this.handleTimeJumpForward = this.handleTimeJumpForward.bind(this)
    this.handleClipEndTimePreview = this.handleClipEndTimePreview.bind(this)
    this.handleClipStartTimePreview = this.handleClipStartTimePreview.bind(this)
  }

  componentDidMount () {
    this.setKeyboardEventListeners()
    this.setState({ isClientSide: true })
  }

  setKeyboardEventListeners () {
    document.body.addEventListener('keydown', (event) => {
      if (event.keyCode === keyLeftArrow) {
        this.player.seekTo(this.player.getCurrentTime() - 5)
        this.forceUpdate() // Force update so the time updates immediately
      } else if (event.keyCode === keyRightArrow) {
        this.player.seekTo(this.player.getCurrentTime() + 5)
        this.forceUpdate() // Force update so the time updates immediately
      }
    })
  }

  playerRef = player => {
    this.player = player
  }

  setCurrentTime = e => {
    const offsetX = e.nativeEvent.offsetX
    const width = e.currentTarget.offsetWidth
    this.player.seekTo(offsetX / width)
  }

  getClipFlagPositions = (): ClipFlagPositions => {
    const { nowPlayingItem } = this.props
    const { clipEndTime, clipStartTime } = nowPlayingItem
    const { duration } = this.state

    let clipEndFlagPositionX = -1
    let clipStartFlagPositionX = -1

    if (this.progressBarWidth.current) {
      const width = this.progressBarWidth.current.offsetWidth

      if (duration && duration > 0 && this.durationNode && this.durationNode.current && this.durationNode.current.innerText !== timePlaceholder) {
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

  handleTimeJumpForward = () => {
    this.player.seekTo(this.player.getCurrentTime() + 15)
    this.forceUpdate()
  }

  handleClipRestart = () => {
    const { nowPlayingItem } = this.props
    const { clipStartTime } = nowPlayingItem
    this.player.seekTo(clipStartTime)
    this.forceUpdate()
  }

  handleItemSkip = (evt) => {
    if (this.props.handleItemSkip) {
      this.setState({
        duration: 0,
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

    if (clipStartTime && clipStartTime > 0) {
      this.player.seekTo(clipStartTime)
    }

    this.forceUpdate()
  }

  onPlay = () => {
    const { clipFinished, handleOnPastClipTime, handleSetPlayedAfterClipFinished,
      nowPlayingItem } = this.props
    const { clipEndTime } = nowPlayingItem

    if (clipEndTime && clipFinished && this.player.getCurrentTime() > clipEndTime && handleOnPastClipTime) {
      handleOnPastClipTime(true)
    }

    if (clipEndTime && clipFinished && this.player.getCurrentTime() > clipEndTime && handleSetPlayedAfterClipFinished) {
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

    if (clipEndTime && !playedAfterClipFinished && this.player.getCurrentTime() > clipEndTime && playing) {
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

  toggleModal = (key) => {
    this.setState({
      openAddToModal: key === 'addTo' ? !this.state.openAddToModal : false,
      openMakeClipModal: key === 'makeClip' ? !this.state.openMakeClipModal : false,
      openQueueModal: key === 'queue' ? !this.state.openQueueModal : false,
      openShareModal: key === 'share' ? !this.state.openShareModal : false
    })
  }

  toggleAddToModal = () => {
    this.toggleModal('addTo')
  }

  toggleMakeClipModal = () => {
    this.toggleModal('makeClip')
  }

  toggleQueueModal = () => {
    this.toggleModal('queue')
  }

  toggleShareModal = () => {
    this.toggleModal('share')
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

  handleClipEndTimePreview = (clipEndTime) => {
    const { handleClipEndTimePreview } = this.props

    if (clipEndTime && handleClipEndTimePreview) {
      handleClipEndTimePreview()
    }
  }

  handleClipStartTimePreview = (clipStartTime) => {
    const { handleClipStartTimePreview } = this.props

    if (clipStartTime && handleClipStartTimePreview) {
      handleClipStartTimePreview()
    }
  }

  render () {
    const { autoplay, handleAddToQueueLast, handleAddToQueueNext, handleMakeClip,
      handleOnEpisodeEnd, handleQueueItemClick, handlePlaybackRateClick, handlePlaylistItemAdd,
      handleToggleAutoplay, handleTogglePlay, isLoggedIn, nowPlayingItem, playbackRate,
      playbackRateText, playedAfterClipFinished, playerClipLinkAs, playerClipLinkHref,
      playerClipLinkOnClick, playerEpisodeLinkAs, playerEpisodeLinkHref, playerEpisodeLinkOnClick,
      playerPodcastLinkAs, playing, playlists, queuePriorityItems, queueSecondaryItems,
      showAutoplay } = this.props

    const { duration, isClientSide, isLoading, openAddToModal, openMakeClipModal,
      openQueueModal, openShareModal, progressPreviewTime } = this.state

    const { clipEndTime, clipId, clipStartTime, clipTitle, episodeMediaUrl, episodeTitle,
      podcastImageUrl, podcastTitle } = nowPlayingItem

    // If the new NowPlayingItem is the same episode as the last one, but it is a
    // different clip, then make the player seek to the new clipStartTime
    if (lastNowPlayingItem.episodeMediaUrl === episodeMediaUrl &&
        (lastNowPlayingItem.clipEndTime !== clipEndTime ||
        lastNowPlayingItem.clipStartTime !== clipStartTime ||
        lastNowPlayingItem.clipTitle !== clipTitle ||
        lastNowPlayingItem.clipId !== clipId) &&
        this.player) {
      this.player.seekTo(clipStartTime)
    }

    // Force ReactPlayer to reload if it receives a new mediaUrl, set loading state,
    // and clear clip flags.
    if (hasMediaUrlChanged(episodeMediaUrl)) {
      incrementReactPlayerKey()
    }

    let { clipEndFlagPositionX, clipStartFlagPositionX } = this.getClipFlagPositions()
    const currentTime = this.player ? this.player.getCurrentTime() : 0

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
                onClick={this.toggleQueueModal}>
                <FontAwesomeIcon icon='list-ul' />
              </button>
              {
                handleMakeClip &&
                  <button
                    className={`mp-header__clip ${openMakeClipModal ? 'active' : ''}`}
                    onClick={this.toggleMakeClipModal}>
                    <FontAwesomeIcon icon='cut' />
                  </button>
              }
              <button
                className={`mp-header__add ${openAddToModal ? 'active' : ''}`}
                onClick={this.toggleAddToModal}>
                <FontAwesomeIcon icon='plus-circle' />
              </button>
              <button
                className={`mp-header__share ${openShareModal ? 'active' : ''}`}
                onClick={this.toggleShareModal}>
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
                  (!isLoading && duration) &&
                    <span className={`mp-player__current-time`}>
                      {convertSecToHHMMSS(this.player.getCurrentTime())}
                    </span>
                }
                {
                  !playedAfterClipFinished &&
                    <React.Fragment>
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
                  value={duration && this.player ? (this.player.getCurrentTime() / duration) * 100 : 0} />
                {
                  (!isLoading && duration) &&
                    <span
                      className={`mp-player__duration`}
                      ref={this.durationNode}>
                      {convertSecToHHMMSS(duration)}
                    </span>
                }
              </div>
              <button
                className='mp-player__time-jump-forward'
                onClick={this.handleTimeJumpForward}>
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
                onClick={this.handleItemSkip}>
                <FontAwesomeIcon icon='step-forward' />
              </button>
            </div>
          </div>
          {
            openAddToModal &&
              <AddToModal
                handleAddToQueueLast={handleAddToQueueLast}
                handleAddToQueueNext={handleAddToQueueNext}
                handlePlaylistItemAdd={handlePlaylistItemAdd}
                hideModal={this.hideAddToModal}
                isOpen={openAddToModal}
                nowPlayingItem={nowPlayingItem}
                playlists={playlists}
                showPlaylists={isLoggedIn}
                showQueue={false} />
          }
          {
            (openMakeClipModal && handleMakeClip) &&
              <MakeClipModal
                handleClipEndTimePreview={this.handleClipEndTimePreview}
                handleClipStartTimePreview={this.handleClipStartTimePreview}
                handleSave={handleMakeClip}
                hideModal={this.hideMakeClipModal}
                isPublic={true}
                isOpen={openMakeClipModal}
                player={this.player}
                startTime={currentTime} />
          }
          <QueueModal
            handleAnchorOnClick={handleQueueItemClick}
            hideModal={this.hideQueueModal}
            isOpen={openQueueModal}
            nowPlayingItem={nowPlayingItem}
            priorityItems={queuePriorityItems}
            secondaryItems={queueSecondaryItems} />
          <ShareModal
            hideModal={this.hideShareModal}
            isOpen={openShareModal}
            playerClipLinkHref={playerClipLinkAs}
            playerEpisodeLinkHref={playerEpisodeLinkAs}
            playerPodcastLinkHref={playerPodcastLinkAs} />
        </div> : <React.Fragment></React.Fragment>
    )
  }
}
