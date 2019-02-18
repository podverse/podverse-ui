import React from 'react'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { MediaListItemD } from './MediaListItemD'
import { readableDate } from 'lib/utility'
import { samplePlaylist1 } from 'storybook/constants'

const { items, lastUpdated, title } = samplePlaylist1

storiesOf('Media', module)
  .addWithJSX(
    'MediaListItemD',
    () => (
      <MediaListItemD
        subTitle={text('subTitle', readableDate(lastUpdated))}
        subTitleSide={text('subTitleSide', items.length)}
        title={text('title', title)}
      />
    )
  )
