import React from 'react'

import { storiesOf } from '@storybook/react'
import { MediaListItemA } from './MediaListItemA'
import { text } from '@storybook/addon-knobs'

storiesOf('Media/MediaListItem', module)
  .addWithJSX(
    'MediaListItemA',
    () => (
      <MediaListItemA 
        imageUrl={text('imageUrl', 'http://static.libsyn.com/p/assets/b/4/6/3/b463232a6b0b641c/James-Altucher-iTunes.jpg')}
        subTitleBottom={text('subTitleBottom', 'Ep. 216 - Yuval Noah Harari: A Brief History of the Future')}
        subTitleBottomSide={text('subTitleBottomSide', '2/28/2017')}
        subTitleTop={text('subTitleTop', 'The James Altucher Show')}
        subTitleTopSide={text('subTitleTopSide', '')}
        title={text('title', '"Money is probably the most successful story ever told, because it\'s the only story everybody believes."')} />
    )
  )
