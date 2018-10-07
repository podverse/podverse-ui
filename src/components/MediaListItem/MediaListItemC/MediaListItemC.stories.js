import React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListItemC } from './MediaListItemC'
import { text } from '@storybook/addon-knobs'
import { sampleEpisode } from 'storybook/constants'

const { description, imageUrl, pubDate, title } = sampleEpisode

storiesOf('Media/MediaListItem', module)
  .addWithJSX(
    'MediaListItemC',
    () => (
      <MediaListItemC 
        date={text('date', pubDate)}
        description={text('description', description)}
        imageUrl={text('imageUrl', imageUrl)}
        title={text('title', title)}
      />
    )
  )
