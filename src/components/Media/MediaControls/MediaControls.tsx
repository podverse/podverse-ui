import * as React from 'react'

type Props = {
  isAutoplayOn: boolean
  onClickAddToPlaylist: (event: React.MouseEvent<HTMLDivElement>) => void
  onClickAutoplay: (event: React.MouseEvent<HTMLDivElement>) => void
  onClickMakeClip: (event: React.MouseEvent<HTMLDivElement>) => void
  onClickShare: (event: React.MouseEvent<HTMLDivElement>) => void
  onClickTimeJumpBack: (event: React.MouseEvent<HTMLDivElement>) => void
  onClickTimeJumpForward: (event: React.MouseEvent<HTMLDivElement>) => void
  showAddToPlaylist: boolean
  showAutoplay: boolean
  showMakeClip: boolean
  showShare: boolean
  showTimeSkips: boolean
}

type State = {
  selectedIcon: string
}

export class MediaControls extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      selectedIcon: 'make-clip'
    }
    this.selectIcon = this.selectIcon.bind(this);
  }

  selectIcon(a, b) {
    console.log(a);
    console.log(b);
  }

  render() {
    const { isAutoplayOn, onClickAddToPlaylist, onClickAutoplay, onClickMakeClip, 
      onClickShare, onClickTimeJumpBack, onClickTimeJumpForward, showAddToPlaylist, 
      showAutoplay, showMakeClip, showShare, showTimeSkips } = this.props
    
    return (
      <div className='media-controls'>
        {
          showTimeSkips &&
            <React.Fragment>
              <div 
                className='media-controls__jump-back'
                onClick={onClickTimeJumpBack}>
                {'< 15'}
              </div>
              <div 
                className='media-controls__jump-forward'
                onClick={onClickTimeJumpForward}>
                {'15 >'}
              </div>
            </React.Fragment>
        }
        {
          showMakeClip &&
            <div 
              className='media-controls__make-clip'
              onClick={onClickMakeClip}>
              Make Clip
            </div>
        }
        {
          showAddToPlaylist &&
            <div
              className='media-controls__add-to-playlist'
              onClick={onClickAddToPlaylist}>
              Add to Playlist
            </div>
        }
        {
          showShare &&
            <div 
              className='media-controls__share'
              onClick={onClickShare}>
              Share
            </div>
        }
        {
          showAutoplay &&
            <div 
              className='media-controls__autoplay'
              onClick={onClickAutoplay}>
              Autoplay {isAutoplayOn ? 'On' : 'Off'}
            </div>
        }
      </div>
    )
    
  }
}
