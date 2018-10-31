import React from 'react'
import { storiesOf } from '@storybook/react'
import { MoreDropdown } from './MoreDropdown'
import { stubFunction } from 'storybook/constants'

const items = [
  {
    icon: 'play',
    onClick: () => console.log('play'),
    text: 'Play',
    value: 'play'
  },
  {
    icon: 'level-up-alt',
    onClick: () => console.log('queue next'),
    text: 'Queue: Next',
    value: 'queue-next'
  },
  {
    icon: 'level-down-alt',
    onClick: () => console.log('queue last'),
    text: 'Queue: Last',
    value: 'queue-last'
  },
  {
    icon: 'list-ul',
    onClick: () => console.log('add to playlist'),
    text: 'Add to Playlist',
    value: 'add-to-playlist'
  }
]

storiesOf('MoreDropdown', module)
  .addWithJSX(
    'MoreDropdown',
    () => (
      <MoreDropdown
        items={items}
        onClick={stubFunction} />
    )
  )
  