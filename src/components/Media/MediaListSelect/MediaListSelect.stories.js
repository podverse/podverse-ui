import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListSelect } from './MediaListSelect'
import { object } from '@storybook/addon-knobs'
import { mediaListSelectOptionsPlayer } from 'storybook/constants'

storiesOf('Media/MediaListSelect', module)
  .addWithJSX(
    'MediaListSelect',
    () => (
      <MediaListSelect
        options={object('options', mediaListSelectOptionsPlayer)}
        value={mediaListSelectOptionsPlayer[0]} />
    )
  )