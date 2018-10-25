import React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListItem } from './MediaListItem'
import { select } from '@storybook/addon-knobs'
import { sampleEpisode, sampleMediaRef1, samplePodcast } from 'storybook/constants'

const itemTypes = [
  'clip', 
  'episode', 
  'episode-clip', 
  'podcast', 
  'podcast-clip',
  'podcast-episode'
]

storiesOf('Media', module)
  .addWithJSX(
    'MediaListItem',
    () => (
      <MediaListItem
        dataClip={sampleMediaRef1}
        dataEpisode={sampleEpisode}
        dataPodcast={samplePodcast}
        itemType={select('itemType', itemTypes)}  />
    )
  )