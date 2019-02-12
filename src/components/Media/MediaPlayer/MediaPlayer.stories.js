import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { State, Store } from '@sambego/storybook-state'
import { MediaPlayer } from './MediaPlayer'
import { sampleMediaRef1, sampleNowPlayingItem1, sampleNowPlayingItem2, sampleNowPlayingItem3,
  sampleNowPlayingItem3b, sampleNowPlayingItem4, sampleNowPlayingItem5, 
  sampleNowPlayingItem6, samplePlaylist1, samplePlaylist2, samplePlaylist3,
  samplePlaylist4, samplePlaylist5, samplePlaylist6, sampleText, stubFunction } from 'storybook/constants'
import { addItemToPriorityQueueStorage, addItemsToSecondaryQueueStorage,
  clearItemsFromPriorityQueueStorage, clearItemsFromSecondaryQueueStorage,
  getPriorityQueueItemsStorage, getSecondaryQueueItemsStorage,
  popNextFromQueueStorage } from 'lib/mediaPlayerStorage'

const { endTime, episodeMediaUrl, episodePubDate, episodeTitle, podcastImageUrl, 
  podcastTitle, startTime, title } = sampleMediaRef1

const nowPlayingItem = {
  clipEndTime: endTime,
  clipStartTime: startTime,
  clipTitle: title,
  episodeMediaUrl: episodeMediaUrl,
  episodePubDate: episodePubDate,
  episodeTitle: episodeTitle,
  imageUrl: podcastImageUrl,
  podcastTitle: podcastTitle
}

const playlists = [samplePlaylist1, samplePlaylist2, samplePlaylist3, samplePlaylist4,
  samplePlaylist5, samplePlaylist6]


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

const getPlaybackRateNextValue = num => {
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

const handleAddToQueueLast = (event) => {
  event.preventDefault()
  alert('add to queue play last')
}

const handleAddToQueueNext = (event) => {
  event.preventDefault()
  alert('add to queue play next')
}

const handlePlaylistItemAdd = (event) => {
  event.preventDefault()
  alert('add item to playlist')
}

const handleItemSkip = () => {
  const result = popNextFromQueueStorage()

  store.set({
    nowPlayingItem: result.nextItem,
    playing: store.get('autoplay'),
    queuePriorityItems: result.priorityItems,
    queueSecondaryItems: result.secondaryItems,
  })
}

const handleOnEnded = () => {
  const autoplay = store.get('autoplay')
  
  if (autoplay) {
    handleItemSkip()
  } else {
    store.set({
      playing: false
    })
  }
}

const handleOnPastClipTime = (shouldPlay) => {
  const nowPlayingItem = store.get('nowPlayingItem')
  nowPlayingItem.clipStartTime = null
  nowPlayingItem.clipEndTime = null
  nowPlayingItem.clipTitle = null
  store.set({
    nowPlayingItem,
    playing: shouldPlay
  })
}

const handlePause = () => {
  store.set({
    playing: false
  })
}

const handlePlaybackRateClick = () => {
  const playbackRate = store.get('playbackRate')
  const nextPlaybackRate = getPlaybackRateNextValue(playbackRate)
  
  store.set({ 
    playbackRate: nextPlaybackRate,
    playbackRateText: getPlaybackRateText(nextPlaybackRate)
  })
}

const handleQueueItemClick = () => {
  alert('queue item clicked')
}

const handleToggleAutoplay = () => {
  store.set({
    autoplay: !store.get('autoplay')
  })
}

const handleTogglePlay = () => {
  store.set({
    playing: !store.get('playing')
  })
}

const store = new Store({
  autoplay: false,
  handleAddToQueueLast,
  handleAddToQueueNext,
  handleItemSkip,
  handleMakeClip: stubFunction,
  handleOnEpisodeEnd: handleOnEnded,
  handleOnPastClipTime,
  handleQueueItemClick,
  handlePause,
  handlePlaybackRateClick,
  handlePlaylistCreate: stubFunction,
  handlePlaylistItemAdd,
  handleToggleAutoplay,
  handleTogglePlay,
  nowPlayingItem,
  playbackRate: 1,
  playbackRateText: '1x',
  playerClipLinkHref: '/clip/1234',
  playerEpisodeLinkHref: '/episode/1234',
  playerPodcastLinkHref: '/podcast/1234',
  playing: false,
  playlists: playlists,
  queuePriorityItems: getPriorityQueueItemsStorage(),
  queueSecondaryItems: getSecondaryQueueItemsStorage(),
  showAddToPlaylists: true,
  showAddToQueue: true
})

clearItemsFromPriorityQueueStorage()
clearItemsFromSecondaryQueueStorage()
addItemToPriorityQueueStorage(sampleNowPlayingItem1)
addItemToPriorityQueueStorage(sampleNowPlayingItem3b, true)
addItemToPriorityQueueStorage(sampleNowPlayingItem3)
addItemsToSecondaryQueueStorage([sampleNowPlayingItem4, sampleNowPlayingItem6,
  sampleNowPlayingItem5, sampleNowPlayingItem2])

storiesOf('Media', module)
  .addWithJSX(
    'MediaPlayer',
    () => (
      <React.Fragment>
        <State store={store}>
          <MediaPlayer />
        </State>
        { JSON.stringify(store.get('nowPlayingItem')) }
        { sampleText }
      </React.Fragment>
    )
  )
