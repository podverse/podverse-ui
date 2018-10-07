import React from 'react'

import { storiesOf } from '@storybook/react'
import { MediaListItemB } from './MediaListItemB'
import { text, boolean } from '@storybook/addon-knobs'

storiesOf('Media/MediaListItem', module)
  .addWithJSX(
    'MediaListItemB',
    () => (
      <MediaListItemB 
        imageUrl={text('imageUrl', 'http://static.libsyn.com/p/assets/7/1/f/3/71f3014e14ef2722/JREiTunesImage2.jpg')}
        subTitle={text('subTitle', '#1137 - Duncan Trussell')}
        subTitleSide={text('subTitleSide', '6/28/2018')}
        title={text('title', 'The Joe Rogan Experience')}
      />
    )
  )