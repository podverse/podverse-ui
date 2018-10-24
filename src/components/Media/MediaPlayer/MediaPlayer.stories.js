import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaPlayer } from './MediaPlayer'
import { sampleClip, sampleText } from 'storybook/constants'

const { endTime, episodeMediaUrl, episodeTitle, podcastImageUrl, 
  podcastTitle, startTime, title } = sampleClip

const nowPlayingItem = {
  clipEndTime: endTime,
  clipStartTime: startTime,
  clipTitle: title,
  episodeMediaUrl: episodeMediaUrl,
  episodeTitle: episodeTitle,
  imageUrl: podcastImageUrl,
  podcastTitle: podcastTitle
}

const handleOnEpisodeEnd = () => {
  console.log('handleOnEpisodeEnd')
}

const handleOnPastClipTime = () => {
  console.log('handlePastClipTime')
}

const stubFunction = () => {console.log('stub a dub dub')}

storiesOf('Media', module)
  .addWithJSX(
    'MediaPlayer',
    () => (
      <React.Fragment>
        <MediaPlayer
          autoplay={false}
          handleAddTo={stubFunction}
          handleMakeClip={stubFunction}
          handleOnEpisodeEnd={handleOnEpisodeEnd}
          handleOnPastClipTime={handleOnPastClipTime}
          nowPlayingItem={nowPlayingItem}
          playbackRate={1}
          playerClipLink='/clip/1234'
          playerEpisodeLink='/episode/1234'
          playerPodcastLink='/podcast/1234'
          playing={false}
          showMute={false} />
        { sampleText }
      </React.Fragment>
    )
  )
