import { addFontAwesomeIcons } from 'lib/fontAwesomeIcons'
import 'scss/styles.scss'
import 'lib/extensions/String'

addFontAwesomeIcons()

export { AddToModal } from 'components/Media/Modals/AddToModal/AddToModal'
export { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'
export { ClipCreatedModal } from 'components/Media/Modals/ClipCreatedModal/ClipCreatedModal'
export { CloseButton } from 'components/CloseButton/CloseButton'
export { ComparisonTable } from 'components/ComparisonTable/ComparisonTable'
export { FilterCtrl } from 'components/FilterCtrl/FilterCtrl'
export { ForgotPasswordModal } from 'components/Auth/ForgotPasswordModal'
export { HeaderNavTabs } from 'components/HeaderNavTabs/HeaderNavTabs'
export { LoginModal } from 'components/Auth/LoginModal'
export { MakeClipModal } from 'components/Media/Modals/MakeClipModal/MakeClipModal'
export { ShareModal } from 'components/Media/Modals/ShareModal/ShareModal'
export { SupportModal } from 'components/Media/Modals/SupportModal/SupportModal'
export { MediaHeader } from 'components/Media/MediaHeader/MediaHeader'
export { MediaInfo } from 'components/Media/MediaInfo/MediaInfo'
export { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
export { MediaListSelect } from 'components/Media/MediaListSelect/MediaListSelect'
export { MediaPlayer } from 'components/Media/MediaPlayer/MediaPlayer'
export { Navbar } from 'components/Navbar/Navbar'
export { Pill } from 'components/Pill/Pill'
export { PVButton as Button } from 'components/Button/Button'
export { PVImage } from 'components/PVImage/PVImage'
export { PVPagination as Pagination } from 'components/Pagination/Pagination'
export { SignUpModal } from 'components/Auth/SignUpModal'
export { KEYS } from 'lib/keys'
export { addItemToPriorityQueueStorage, getLastHistoryItemOrNowPlayingItemFromStorage,
  getNowPlayingItemFromStorage, getPriorityQueueItemsStorage, popNextFromPriorityQueueStorage,
  popNextFromQueueStorage,removeItemFromPriorityQueueStorage, setNowPlayingItemInStorage,
  updatePriorityQueueStorage } from 'lib/mediaPlayerStorage'
