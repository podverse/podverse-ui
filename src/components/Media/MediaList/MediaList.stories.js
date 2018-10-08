import React from 'react'

import { storiesOf } from '@storybook/react'
import { MediaList } from './MediaList'
import { text, boolean } from '@storybook/addon-knobs'

storiesOf('Media/MediaList', module)
  .addWithJSX(
    'MediaList',
    () => (
      <MediaList />
    )
  )