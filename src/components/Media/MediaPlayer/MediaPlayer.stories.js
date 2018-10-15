import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaPlayer } from './MediaPlayer'
import { sampleClip, sampleText } from 'storybook/constants'

const { episodeMediaUrl } = sampleClip

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
          clipEndTime={900}
          clipStartTime={600}
          handleOnEpisodeEnd={handleOnEpisodeEnd}
          handleOnPastClipTime={handleOnPastClipTime}
          // url={select('url', [
          //   episodeMediaUrl,
          //   'http://traffic.libsyn.com/altucher/JAS-400-ImCelebrating400Episodes-Pt1-v01-FREE.mp3',
          //   'http://traffic.libsyn.com/altucher/JAS-390-DanRoth-v01-FREE.mp3?dest-id=172343'
          // ])} 
          url={episodeMediaUrl}
          />
        { sampleText }
      </React.Fragment>
    )
  )
