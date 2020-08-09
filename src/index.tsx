import { addFontAwesomeIcons } from 'lib/fontAwesomeIcons'
import 'scss/styles.scss'
import 'lib/extensions/String'

addFontAwesomeIcons()

export { AddToModal } from 'components/Media/Modals/AddToModal/AddToModal'
export { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'
export { ClipCreatedModal } from 'components/Media/Modals/ClipCreatedModal/ClipCreatedModal'
export { CloseButton } from 'components/CloseButton/CloseButton'
export { ComparisonTable } from 'components/ComparisonTable/ComparisonTable'
export { ForgotPasswordModal } from 'components/Auth/ForgotPasswordModal'
export { ImageSquare } from 'components/Image/ImageSquare'
export { LoginModal } from 'components/Auth/LoginModal'
export { MakeClipModal } from 'components/Media/Modals/MakeClipModal/MakeClipModal'
export { MediaHeader } from 'components/Media/MediaHeader/MediaHeader'
export { MediaInfo } from 'components/Media/MediaInfo/MediaInfo'
export { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
export { MediaListSelect } from 'components/Media/MediaListSelect/MediaListSelect'
export { MediaPlayer } from 'components/Media/MediaPlayer/MediaPlayer'
export { Navbar } from 'components/Navbar/Navbar'
export { PVButton as Button } from 'components/Button/Button'
export { PVPagination as Pagination } from 'components/Pagination/Pagination'
export { QueueModal } from 'components/Media/Modals/QueueModal/QueueModal'
export { ShareModal } from 'components/Media/Modals/ShareModal/ShareModal'
export { SignUpModal } from 'components/Auth/SignUpModal'
export { KEYS } from 'lib/keys'
export { addItemToPriorityQueueStorage, updatePriorityQueueStorage,
  addItemsToSecondaryQueueStorage, clearItemsFromSecondaryQueueStorage, getLastHistoryItemOrNowPlayingItemFromStorage,
  getPriorityQueueItemsStorage, getSecondaryQueueItemsStorage, popNextFromPriorityQueueStorage,
  popNextFromQueueStorage, popNextFromSecondaryQueueStorage, removeItemFromPriorityQueueStorage,
  removeItemFromSecondaryQueueStorage, getNowPlayingItemFromStorage,
  setNowPlayingItemInStorage } from 'lib/mediaPlayerStorage'
