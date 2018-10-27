import React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListItem } from './MediaListItem'
import { select } from '@storybook/addon-knobs'
import { sampleEpisode, sampleMediaRef1, sampleNowPlayingItem1, samplePlaylist1,
  samplePodcast } from 'storybook/constants'

const itemTypes = [
  'clip', 
  'episode', 
  'episode-clip',
  'now-playing-item',
  'playlist',
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
        dataNowPlayingItem={sampleNowPlayingItem1}
        dataPlaylist={samplePlaylist1}
        dataPodcast={samplePodcast}
        itemType={select('itemType', itemTypes)}  />
    )
  )