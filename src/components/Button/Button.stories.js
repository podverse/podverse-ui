import React from 'react'

import { storiesOf } from '@storybook/react'
import { Button } from './Button'
import { text, boolean } from '@storybook/addon-knobs'

storiesOf('Components/Button', module).addWithJSX(
  'basic Button',
  () => (
    <Button
      label={text('label', 'Enroll')}
      disabled={boolean('disabled', false)}
      onClick={() => alert('hello there')} />
  )
)