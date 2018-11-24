import { addFontAwesomeIcons } from 'lib/fontAwesomeIcons'
import 'scss/styles.scss'

addFontAwesomeIcons()

export { ForgotPasswordModal } from 'components/Auth/ForgotPasswordModal'
export { LoginModal } from 'components/Auth/LoginModal'
export { SignUpModal } from 'components/Auth/SignUpModal'

export { PVButton } from 'components/Button/Button'

export { ButtonGroup } from 'components/Form/ButtonGroup/ButtonGroup'

export { MediaHeader } from 'components/Media/MediaHeader/MediaHeader'
export { MediaInfo } from 'components/Media/MediaInfo/MediaInfo'
export { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
export { MediaListSelect } from 'components/Media/MediaListSelect/MediaListSelect'
export { MediaPlayer } from 'components/Media/MediaPlayer/MediaPlayer'

export { AddToModal } from 'components/Media/Modals/AddToModal/AddToModal'
export { MakeClipModal } from 'components/Media/Modals/MakeClipModal/MakeClipModal'
export { QueueModal } from 'components/Media/Modals/QueueModal/QueueModal'
export { ShareModal } from 'components/Media/Modals/ShareModal/ShareModal'

export { Navbar } from 'components/Navbar/Navbar'

export { addItemToPriorityQueueStorage, addItemsToSecondaryQueueStorage,
  clearItemsFromSecondaryQueueStorage, getPriorityQueueItemsStorage, getSecondaryQueueItemsStorage,
  popNextFromPriorityQueueStorage, popNextFromQueueStorage, popNextFromSecondaryQueueStorage,
  removeItemFromPriorityQueueStorage } from 'lib/mediaPlayerQueue'
export { convertToNowPlayingItem } from 'lib/nowPlayingItem'
