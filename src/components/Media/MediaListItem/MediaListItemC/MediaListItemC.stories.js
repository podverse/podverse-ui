import React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListItemC } from './MediaListItemC'
import { text } from '@storybook/addon-knobs'
import { sampleEpisode } from 'storybook/constants'

const { description, title } = sampleEpisode

storiesOf('Media', module)
  .addWithJSX(
    'MediaListItemC',
    () => (
      <MediaListItemC 
        date={text('date', '01/01/00')}
        description={text('description', description)}
        title={text('title', title)}
      />
    )
  )
