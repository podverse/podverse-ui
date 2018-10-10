import * as React from 'react'
import { addDecorator, configure, setAddon } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import JSXAddon from 'storybook-addon-jsx'
import { addFontAwesomeIcons } from 'lib/fontAwesomeIcons'
import 'scss/styles.scss'

addFontAwesomeIcons()

const themeMode = 'light' // light or dark
document.documentElement.setAttribute('theme', themeMode)

setOptions({
  name: 'Podverse UI',
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

const styles = {
  backgroundColor: themeMode === 'dark' ? 'black' : 'white'
};
const ThemeDecorator = (storyFn) => (
  <div style={styles}>
    {storyFn()}
  </div>
);
addDecorator(ThemeDecorator);

addDecorator(withKnobs)
setAddon(JSXAddon)

const req = require.context('../src', true, /.stories.js$/)

function loadStories () {
  require('./welcomeStory')
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
