import React from 'react'

import { storiesOf } from '@storybook/react'
import { MediaListItem } from './MediaListItem'
import { text, boolean } from '@storybook/addon-knobs'

storiesOf('Media/MediaListItem', module)
  .addWithJSX(
    'MediaListItem',
    () => (
      <MediaListItem />
    )
  )