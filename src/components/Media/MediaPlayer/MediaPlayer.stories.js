import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { State, Store } from '@sambego/storybook-state'
import { MediaPlayer } from './MediaPlayer'
import { sampleMediaRef1, sampleNowPlayingItem1, sampleNowPlayingItem2, sampleNowPlayingItem3,
  sampleNowPlayingItem3b, sampleNowPlayingItem4, sampleNowPlayingItem5, 
  sampleNowPlayingItem6, samplePlaylist1, samplePlaylist2, samplePlaylist3,
  samplePlaylist4, samplePlaylist5, samplePlaylist6, sampleText, stubFunction } from 'storybook/constants'
import { addItemToPriorityQueue, addItemsToSecondaryQueue,
  clearItemsFromPriorityQueue, clearItemsFromSecondaryQueue,
  getPriorityQueueItems, getSecondaryQueueItems,
  popNextFromQueue } from 'lib/mediaPlayerQueue'

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

const handleAddToQueuePlayLast = (event) => {
  event.preventDefault()
  alert('add to queue play last')
}

const handleAddToQueuePlayNext = (event) => {
  event.preventDefault()
  alert('add to queue play next')
}

const handlePlaylistItemAdd = (event) => {
  event.preventDefault()
  alert('add item to playlist')
}

const handleItemSkip = () => {
  const result = popNextFromQueue()

  store.set({
    nowPlayingItem: result.nextItem,
    playing: store.get('autoplay'),
    queuePrimaryItems: result.primaryItems,
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
  handleAddToQueuePlayLast,
  handleAddToQueuePlayNext,
  handleItemSkip,
  handleMakeClip: stubFunction,
  handleOnEpisodeEnd: handleOnEnded,
  handleOnPastClipTime,
  handleQueueItemClick,
  handlePause,
  handlePlaylistCreate: stubFunction,
  handlePlaylistItemAdd,
  handleToggleAutoplay,
  handleTogglePlay,
  nowPlayingItem,
  playbackRate: 1,
  playerClipLink: '/clip/1234',
  playerEpisodeLink: '/episode/1234',
  playerPodcastLink: '/podcast/1234',
  playing: false,
  playlists: playlists,
  queuePrimaryItems: getPriorityQueueItems(),
  queueSecondaryItems: getSecondaryQueueItems(),
  showAddToPlaylists: true,
  showAddToQueue: true
})

clearItemsFromPriorityQueue()
clearItemsFromSecondaryQueue()
addItemToPriorityQueue(sampleNowPlayingItem1)
addItemToPriorityQueue(sampleNowPlayingItem3b, true)
addItemToPriorityQueue(sampleNowPlayingItem3)
addItemsToSecondaryQueue([sampleNowPlayingItem4, sampleNowPlayingItem6,
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
