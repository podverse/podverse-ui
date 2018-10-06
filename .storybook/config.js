import { addDecorator, configure, setAddon } from '@storybook/react'

import { withKnobs, select } from '@storybook/addon-knobs/react'
import JSXAddon from 'storybook-addon-jsx'

addDecorator(withKnobs)
setAddon(JSXAddon)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)
function loadStories () {
  require('./welcomeStory')
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
