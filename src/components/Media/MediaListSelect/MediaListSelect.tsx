import Link from 'next/link'
import * as React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

type Props = {
  className?: string
  isSubSelect?: boolean
  items: Array<any>
  name?: string
  selected?: string
}

type State = {
  dropdownOpen: boolean
}

export class MediaListSelect extends React.Component<Props, State> {
  static defaultProps: Props = {
    className: '',
    items: []
  }

  constructor (props) {
    super(props)

    this.state = {
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  render () {
    const { className, isSubSelect, items, name, selected } = this.props

    let selectedText
    const itemNodes = Array.isArray(items) && items.map((x, index) => {
      if (!selected && index === 0 || selected === x.value) {
        selectedText = x.label
        return
      }

      if (x.href && x.as) {
        return (
          <Link
            key={`media-list-select-link-${name}${index}`}
            href={x.href}
            as={x.as}>
            <DropdownItem
              href={x.href}
              key={`${name}${index}`}
              onClick={x.onClick}>
              {x.label}
            </DropdownItem>
          </Link>
        )
      } else {
        return (
          <DropdownItem
            key={`${name}${index}`}
            onClick={x.onClick}>
            {x.label}
          </DropdownItem>
        )
      }
    })

    const selectClass = isSubSelect ? 'media-list__select' : 'media-list__sub-select'

    return (
      items.length > 1 ?
        <Dropdown
          className={`${selectClass} ${className}`}
          direction='down'
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}>
          <DropdownToggle
            caret
            className='transparent' >
            {selectedText}
          </DropdownToggle>
          <DropdownMenu>
            {itemNodes}
          </DropdownMenu>
        </Dropdown> :
        <div className={`${selectClass} dropdown`}>
          <div className={`btn one-option-only`}>{selectedText}</div>
        </div>
    )
  }
}
