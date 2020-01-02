import React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListItem } from './MediaListItem'
import { select } from '@storybook/addon-knobs'
import { sampleEpisode, sampleNowPlayingItem1, samplePlaylist1,
  samplePodcast } from 'storybook/constants'

const itemTypes = [
  'clip', 
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
        dataEpisode={sampleEpisode}
        dataNowPlayingItem={sampleNowPlayingItem1}
        dataPlaylist={samplePlaylist1}
        dataPodcast={samplePodcast}
        itemType={select('itemType', itemTypes)}  />
    )
  )