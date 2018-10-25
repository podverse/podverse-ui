import React from 'react'

import { storiesOf } from '@storybook/react'
import { MediaListItemA } from './MediaListItemA'
import { text } from '@storybook/addon-knobs'
import { sampleMediaRef1 } from 'storybook/constants'

const {episodePubDate, episodeTitle, podcastImageUrl,
  podcastTitle, title} = sampleMediaRef1

storiesOf('Media', module)
  .addWithJSX(
    'MediaListItemA',
    () => (
      <MediaListItemA 
        imageUrl={text('imageUrl', podcastImageUrl)}
        subTitleBottom={text('subTitleBottom', episodeTitle)}
        subTitleBottomSide={text('subTitleBottomSide', '01/01/00')}
        subTitleTop={text('subTitleTop', podcastTitle)}
        subTitleTopSide={text('subTitleTopSide', '')}
        title={text('title', title)} />
    )
  )
