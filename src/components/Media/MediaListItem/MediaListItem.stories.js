import React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListItem } from './MediaListItem'
import { select } from '@storybook/addon-knobs'
import { sampleClip, sampleEpisode, samplePodcast } from 'storybook/constants'

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
        dataClip={sampleClip}
        dataEpisode={sampleEpisode}
        dataPodcast={samplePodcast}
        itemType={select('itemType', itemTypes)}  />
    )
  )