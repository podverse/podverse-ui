import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaPlayer } from './MediaPlayer'
import { sampleClip, sampleText } from 'storybook/constants'
import { select } from '@storybook/addon-knobs'

const { episodeMediaUrl } = sampleClip

let startTime = 600
let endTime = 900

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
          clipEndTime={endTime}
          clipStartTime={startTime}
          handleOnEpisodeEnd={handleOnEpisodeEnd}
          handleOnPastClipTime={handleOnPastClipTime}
          url={select('url', [
            'http://traffic.libsyn.com/altucher/JAS-400-ImCelebrating400Episodes-Pt1-v01-FREE.mp3',
            'http://traffic.libsyn.com/altucher/JAS-390-DanRoth-v01-FREE.mp3?dest-id=172343'
          ])}
          url={episodeMediaUrl} />
        { sampleText }
      </React.Fragment>
    )
  )
