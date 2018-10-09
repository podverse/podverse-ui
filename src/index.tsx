import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import 'scss/styles.scss'

library.add(faCheckSquare, faCoffee)

export { Button } from 'components/Button/Button'
export { MediaList } from 'components/Media/MediaList/MediaList'
export { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
export { MediaListItemA } from 'components/Media/MediaListItem/MediaListItemA/MediaListItemA'
export { MediaListItemB } from 'components/Media/MediaListItem/MediaListItemB/MediaListItemB'
export { MediaListItemC } from 'components/Media/MediaListItem/MediaListItemC/MediaListItemC'
export { MediaListSelect } from 'components/Media/MediaListSelect/MediaListSelect'
export { MediaListSubSelect } from 'components/Media/MediaListSubSelect/MediaListSubSelect'