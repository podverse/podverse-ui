import React from 'react'

import { storiesOf } from '@storybook/react'
import { MediaListItemA } from './MediaListItemA'
import { text } from '@storybook/addon-knobs'
import { sampleClip } from 'storybook/constants'

const {episodeDescription, episodePubDate, episodeTitle, podcastImageUrl,
  podcastTitle} = sampleClip

storiesOf('Media/MediaListItem', module)
  .addWithJSX(
    'MediaListItemA',
    () => (
      <MediaListItemA 
        imageUrl={text('imageUrl', podcastImageUrl)}
        subTitleBottom={text('subTitleBottom', episodeTitle)}
        subTitleBottomSide={text('subTitleBottomSide', episodePubDate)}
        subTitleTop={text('subTitleTop', podcastTitle)}
        subTitleTopSide={text('subTitleTopSide', '')}
        title={text('title', episodeDescription)} />
    )
  )
