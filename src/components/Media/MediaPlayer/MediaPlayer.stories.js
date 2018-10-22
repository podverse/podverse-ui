import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaPlayer } from './MediaPlayer'
import { sampleClip, sampleText } from 'storybook/constants'

const { endTime, episodeMediaUrl, episodeTitle, podcastImageUrl, 
  podcastTitle, startTime, title } = sampleClip

const handleOnEpisodeEnd = () => {
  console.log('handleOnEpisodeEnd')
}

const handleOnPastClipTime = () => {
  console.log('handlePastClipTime')
}

storiesOf('Media', module)
  .addWithJSX(
    'MediaPlayer',
    () => (
      <React.Fragment>
        <MediaPlayer
          autoplay={false}
          clipEndTime={endTime}
          clipStartTime={startTime}
          clipTitle={title}
          episodeMediaUrl={episodeMediaUrl}
          episodeTitle={episodeTitle}
          handleOnEpisodeEnd={handleOnEpisodeEnd}
          handleOnPastClipTime={handleOnPastClipTime}
          imageUrl={podcastImageUrl}
          playbackRate={1}
          playerClipLink='/clip/1234'
          playerEpisodeLink='/episode/1234'
          playing={false}
          podcastTitle={podcastTitle}
          showMute={false}
          url={episodeMediaUrl} />
        { sampleText }
      </React.Fragment>
    )
  )
