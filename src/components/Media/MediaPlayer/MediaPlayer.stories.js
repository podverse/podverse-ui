import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaPlayer } from './MediaPlayer'
import { sampleClip, sampleText } from 'storybook/constants'

const { episodeMediaUrl } = sampleClip

storiesOf('Media', module)
  .addWithJSX(
    'MediaPlayer',
    () => (
      <React.Fragment>
        <MediaPlayer
          url={episodeMediaUrl} />
        { sampleText }
      </React.Fragment>
    )
  )
