import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Navbar from './Navbar'

const dropdownItems = [
  { href: '#', label: 'Settings' },
  { href: '#', label: 'Log out' }
]
const navItems = [
  { href: '#', label: 'Search' },
  { href: '#', label: 'Clips' },
  { href: '#', label: 'Podcasts' },
  { href: '#', label: 'Playlists' }
]
const dropdownText = 'Mitch'

storiesOf('Navbar', module)
  .addWithJSX(
    'Navbar',
    () => (
      <Navbar
        brandText='Podverse'
        brandHref='#'
        dropdownItems={dropdownItems} 
        dropdownText={dropdownText}
        navItems={navItems} />
    )
  )