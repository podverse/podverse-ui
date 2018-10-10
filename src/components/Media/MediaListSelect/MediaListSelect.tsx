import * as React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

type Props = {
  isSubSelect: boolean
  items: Array<any>
  selected: string
}

type State = {
  dropdownOpen: boolean
}

export class MediaListSelect extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  render() {
    const { isSubSelect, items, selected } = this.props

    let selectedText
    const itemNodes = items.map(x => {
      if (selected === x.value) {
        selectedText = x.label
        return
      }
      
      return (
        <DropdownItem
          href={x.href}
          onClick={x.onClick}>
          {x.label}
        </DropdownItem>
      )
    })

    const selectClass = isSubSelect ? 'media-list__select' : 'media-list__sub-select'

    return (
      <Dropdown 
        className={selectClass}
        isOpen={this.state.dropdownOpen} 
        toggle={this.toggle}>
        <DropdownToggle caret>
          {selectedText}
        </DropdownToggle>
        <DropdownMenu>
          {itemNodes}
        </DropdownMenu>
      </Dropdown>
    )
  }
}
