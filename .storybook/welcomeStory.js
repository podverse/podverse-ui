import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome', module).addWithJSX(
  'to your new Storybook',
  () => (
    <div>hello world!</div>
  )
)