import { addDecorator, configure, setAddon } from '@storybook/react'

import { setOptions } from '@storybook/addon-options'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import JSXAddon from 'storybook-addon-jsx'

import '../src/scss/styles.scss'

setOptions({
  name: 'Podverse UI Storybook',
  url: '#',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  sortStoriesByKind: false,
  hierarchySeparator: null,
  hierarchyRootSeparator: null,
  sidebarAnimations: true,
  selectedAddonPanel: undefined
})

addDecorator(withKnobs)
setAddon(JSXAddon)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)
function loadStories () {
  require('./welcomeStory')
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
