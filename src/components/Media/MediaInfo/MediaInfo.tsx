import * as React from 'react'
import { readableClipTime } from 'lib/util';

type Props = {
  clipEndTime: string
  clipStartTime: string
  clipTitle: string
  description: string
  onClickClipTime: (event: React.MouseEvent<HTMLDivElement>) => void
  isFullEpisode: boolean
}

type State = {
  showDescription: boolean
}

export class MediaInfo extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      showDescription: false
    }

    this.toggleDescription = this.toggleDescription.bind(this)
  }

  toggleDescription() {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription
    }))
  }

  render () {
    const { clipEndTime, clipStartTime, clipTitle, description,
      onClickClipTime, isFullEpisode } = this.props
    const { showDescription } = this.state

    return (
      <div className='media-info'>
        {
          clipTitle &&
            <div className='media-info__clip-title'>
              {clipTitle}
            </div>
        }
        {
          clipStartTime &&
            <div
              className='media-info__clip-time'
              onClick={onClickClipTime}>
              {readableClipTime(clipStartTime, clipEndTime)}
            </div>
        }
        {
          !isFullEpisode &&
            <div
              className='media-info__show-more'
              onClick={this.toggleDescription}>
              {this.state.showDescription ? 'Hide Notes' : 'Show Notes'}
            </div>
        }
        {
          (description && showDescription) &&
            <div className='media-info__description'>
              {description}
            </div>
        }
      </div>
    )
  } 
}
