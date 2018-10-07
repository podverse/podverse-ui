import React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListItemB } from './MediaListItemB'
import { text } from '@storybook/addon-knobs'
import { samplePodcast } from 'storybook/constants'

const { imageUrl, lastEpisodePubDate, lastEpisodeTitle, title } = samplePodcast

storiesOf('Media/MediaListItem', module)
  .addWithJSX(
    'MediaListItemB',
    () => (
      <MediaListItemB 
        imageUrl={text('imageUrl', imageUrl)}
        subTitle={text('subTitle', lastEpisodeTitle)}
        subTitleSide={text('subTitleSide', lastEpisodePubDate)}
        title={text('title', title)}
      />
    )
  )