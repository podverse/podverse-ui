import { addFontAwesomeIcons } from 'lib/fontAwesomeIcons'
import 'scss/styles.scss'

addFontAwesomeIcons()

export { MediaHeader } from 'components/Media/MediaHeader/MediaHeader'
export { MediaInfo } from 'components/Media/MediaInfo/MediaInfo'
export { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
export { MediaListSelect } from 'components/Media/MediaListSelect/MediaListSelect'
export { MediaPlayer } from 'components/Media/MediaPlayer/MediaPlayer'

export { Navbar } from 'components/Navbar/Navbar'

export { addItemToPriorityQueueStorage, addItemsToSecondaryQueueStorage,
  clearItemsFromSecondaryQueueStorage, getPriorityQueueItemsStorage, getSecondaryQueueItemsStorage,
  popNextFromPriorityQueueStorage, popNextFromQueueStorage, popNextFromSecondaryQueueStorage,
  removeItemFromPriorityQueueStorage } from 'lib/mediaPlayerQueue'
export { convertToNowPlayingItem } from 'lib/nowPlayingItem'
