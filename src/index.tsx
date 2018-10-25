import { addFontAwesomeIcons } from 'lib/fontAwesomeIcons'
import 'scss/styles.scss'

addFontAwesomeIcons()

export { MediaHeader } from 'components/Media/MediaHeader/MediaHeader'
export { MediaInfo } from 'components/Media/MediaInfo/MediaInfo'
export { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
export { MediaListSelect } from 'components/Media/MediaListSelect/MediaListSelect'
export { MediaPlayer } from 'components/Media/MediaPlayer/MediaPlayer'

export { addItemToPriorityQueue, addItemsToSecondaryQueue,
  clearItemsFromSecondaryQueue, getPriorityQueueItems, getSecondaryQueueItems,
  popNextFromPriorityQueue, popNextFromQueue, popNextFromSecondaryQueue,
  removeItemFromPriorityQueue } from 'lib/mediaPlayerQueue'
export { convertToNowPlayingItem } from 'lib/nowPlayingItem'
