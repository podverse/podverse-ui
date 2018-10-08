import * as React from 'react'

type Props = { items: any }

const initialState = { isOpen: false }
type State = Readonly<typeof initialState>

export class MediaListSelect extends React.Component<Props, State> {
  static defaultProps = {
    items: [
      { href: '/asdf', text: 'number 1' },
      { href: '/qwer', text: 'number 2' },
      { href: '/zxcv', text: 'number 3' }
    ]
  }

  readonly state: State = initialState

  render() {
    const { items } = this.props
    const { isOpen } = this.state
    
    const itemNodes = items.map(item => <a href={`${item.href}`}>{item.text}</a>)
    
    return (
      <div className='media-list__select'>
        <button 
          className='media-list-select__button'
          onClick={this.handleToggle}>
          Toggle Menu
        </button>
        {
          isOpen &&
            <div
              className='media-list-select__menu'
              role='menu'>
              {itemNodes}
            </div>
        }
      </div>
    )
  }
  
  private handleToggle = () => this.setState({isOpen: !this.state.isOpen })
  // private handleClose = () => this.setState({isOpen: false })
  // private handleOpen = () => this.setState({isOpen: true })
}
