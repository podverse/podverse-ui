import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { State, Store } from '@sambego/storybook-state'
import { MediaPlayer } from './MediaPlayer'
import { sampleMediaRef1, sampleMediaRef2, sampleMediaRef3, sampleMediaRef3b,
  sampleMediaRef4, sampleMediaRef5, sampleMediaRef6, sampleText } from 'storybook/constants'
import { addItemToPriorityQueue, addItemsToSecondaryQueue,
  clearItemsFromPriorityQueue, clearItemsFromSecondaryQueue,
  popNextFromQueue } from 'lib/mediaPlayerQueue'
import { convertToNowPlayingItem } from 'lib/nowPlayingItem'

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

const stubFunction = () => {console.log('stub a dub dub')}

const handleItemSkip = () => {
  const nextItem = popNextFromQueue()
  store.set({
    nowPlayingItem: convertToNowPlayingItem(nextItem),
    playing: store.get('autoplay')
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
  handleItemSkip,
  handleMakeClip: stubFunction,
  handleOnEpisodeEnd: handleOnEnded,
  handleOnPastClipTime,
  handlePause,
  handlePlaylistCreate: stubFunction,
  handlePlaylistItemAdd: stubFunction,
  handleToggleAutoplay,
  handleTogglePlay,
  nowPlayingItem,
  playbackRate: 1,
  playerClipLink: '/clip/1234',
  playerEpisodeLink: '/episode/1234',
  playerPodcastLink: '/podcast/1234',
  playing: false,
  showMute: false
})

clearItemsFromPriorityQueue()
clearItemsFromSecondaryQueue()
addItemToPriorityQueue(sampleMediaRef2)
addItemToPriorityQueue(sampleMediaRef3)
addItemToPriorityQueue(sampleMediaRef3b, true)
addItemsToSecondaryQueue([sampleMediaRef4, sampleMediaRef6, sampleMediaRef5])

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
