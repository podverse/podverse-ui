import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaListSelect } from './MediaListSelect'
import { mediaListSubSelectItemsPlayer } from 'storybook/constants'

storiesOf('Media/MediaListSelect', module)
  .addWithJSX(
    'MediaListSelect',
    () => (
      <MediaListSelect
        isSubSelect={false}
        items={mediaListSubSelectItemsPlayer}
        selected={mediaListSubSelectItemsPlayer[0].value} />
    )
  )