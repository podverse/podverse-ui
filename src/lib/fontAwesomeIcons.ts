import { library } from '@fortawesome/fontawesome-svg-core'
import { faCut, faListUl, faPause, faPlay, faShare, faStepBackward,
  faStepForward, faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

// Adds FontAwesome icons to the library so they can be used throughout the app
export const addFontAwesomeIcons = () => {
  library.add(
    faCut,
    faListUl,
    faPause,
    faPlay,
    faShare,
    faStepBackward,
    faStepForward,
    faVolumeOff,
    faVolumeUp
  )
}
