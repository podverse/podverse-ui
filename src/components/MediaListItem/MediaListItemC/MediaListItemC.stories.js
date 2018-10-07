import React from 'react'

import { storiesOf } from '@storybook/react'
import { MediaListItemC } from './MediaListItemC'
import { text, boolean } from '@storybook/addon-knobs'

storiesOf('Media/MediaListItem', module)
  .addWithJSX(
    'MediaListItemC',
    () => (
      <MediaListItemC 
        date={text('date', '7/14/2018')}
        description={text('description', 'The Asia-Pacific War of 1937-1945 has deep roots. It also involves a Japanese society that\'s been called one of the most distinctive on Earth. If there were a Japanese version of Captain America, this would be his origin story.')}
        imageUrl={text('imageUrl', 'https://www.dancarlin.com/graphics/DC_HH_iTunes.jpg')}
        title={text('title', 'Dan Carlin\'s Hardcore History')}
      />
    )
  )
