import * as React from 'react'

type Props = {
  clipReadableTime: string
  clipTime: number
  clipTitle: string
  description: string
  handleClipReadableTimeOnClick: (event: React.MouseEvent<HTMLDivElement>) => void
  isEpisode: boolean
}

type State = {
  showDescription: boolean
}

export class MediaInfo extends React.Component<Props, State> {
  
  constructor(props) {
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

  render() {
    const { clipReadableTime, clipTitle, description,
      handleClipReadableTimeOnClick, isEpisode } = this.props
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
          clipReadableTime &&
            <div 
              className='media-info__clip-readable-time'
              onClick={handleClipReadableTimeOnClick}>
              {clipReadableTime}
            </div>
        }
        {
          !isEpisode &&
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
