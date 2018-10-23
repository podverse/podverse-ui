import { library } from '@fortawesome/fontawesome-svg-core'
import { faCut, faEllipsisH, faGlobeAmericas, faInfinity, faLink, faListUl, faPause,
  faPlay, faPlusCircle, faRedoAlt, faShare, faStepBackward, faStepForward, faTimes,
  faUndoAlt, faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

// Adds FontAwesome icons to the library so they can be used throughout the app
export const addFontAwesomeIcons = () => {
  library.add(
    faCut,
    faEllipsisH,
    faGlobeAmericas,
    faInfinity,
    faLink,
    faListUl,
    faPause,
    faPlay,
    faPlusCircle,
    faRedoAlt,
    faShare,
    faStepBackward,
    faStepForward,
    faTimes,
    faUndoAlt,
    faVolumeOff,
    faVolumeUp
  )
}
