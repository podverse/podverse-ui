import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MediaControls } from './MediaControls'

storiesOf('Media/MediaControls', module)
  .addWithJSX(
    'MediaControls',
    () => (
      <MediaControls
        onClickAddToPlaylist={() => console.log('click')}
        onClickAutoplay={() => console.log('click')}
        onClickMakeClip={() => console.log('click')}
        onClickShare={() => console.log('click')}
        onClickTimeJumpBack={() => console.log('click')} 
        onClickTimeJumpForward={() => console.log('click')} 
        showAddToPlaylist={true}
        showAutoplay={true}
        showMakeClip={true}
        showShare={true}
        showTimeSkips={true} />
    )
  )