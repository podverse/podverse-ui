import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaPlayer } from './MediaPlayer'
import { sampleClip } from 'storybook/constants'

const { episodeMediaUrl } = sampleClip

storiesOf('Media', module)
  .addWithJSX(
    'MediaPlayer',
    () => (
      <MediaPlayer
        url={episodeMediaUrl} />
    )
  )