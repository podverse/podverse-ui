import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListSubSelect } from './MediaListSubSelect'
import { object } from '@storybook/addon-knobs'
import { mediaListSubSelectOptionsPlayer } from 'storybook/constants'

storiesOf('Media/MediaListSubSelect', module)
  .addWithJSX(
    'MediaListSubSelect',
    () => (
      <MediaListSubSelect
        options={object('options', mediaListSubSelectOptionsPlayer)} />
    )
  )