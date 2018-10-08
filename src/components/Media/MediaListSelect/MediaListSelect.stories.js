import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListSelect } from './MediaListSelect'
// import { text } from '@storybook/addon-knobs'

storiesOf('Media/MediaListSelect', module)
  .addWithJSX(
    'MediaListSelect',
    () => (
      <MediaListSelect />
    )
  )