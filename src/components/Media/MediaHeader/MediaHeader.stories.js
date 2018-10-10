import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaHeader } from './MediaHeader'
import { text } from '@storybook/addon-knobs'
import { samplePodcast } from 'storybook/constants'

const {authors, categories, imageUrl, title} = samplePodcast
const authLabels = authors.map(a => a.name)
const categoryLabels = categories.map(c => c.title)

storiesOf('Media', module)
  .addWithJSX(
    'MediaHeader',
    () => (
      <MediaHeader
        bottomText={authLabels}
        imageUrl={imageUrl}
        subTitle={categoryLabels}
        subTitleLink='#'
        title={text('title', title)}
        titleLink='#' />
    )
  )
