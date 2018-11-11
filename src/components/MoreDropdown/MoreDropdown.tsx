import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

type Props = {
  className?: string
  direction?: string
  items: any
}

type State = {
  isOpen?: boolean
}

export class MoreDropdown extends React.Component<Props, State> {

  static defaultProps: Props = {
    direction: 'left',
    items: []
  }

  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const { className, direction, items } = this.props
    const { isOpen } = this.state

    const dropdownItemNodes = items.map(x =>
      <DropdownItem
        data-value={x.value}
        onClick={x.onClick}>
        <FontAwesomeIcon icon={x.icon} />
        &nbsp; {x.text}
      </DropdownItem>
    )

    return (
      <Dropdown
        className={`more-dropdown-menu ${className ? className : ''}`}
        direction={direction}
        isOpen={isOpen}
        toggle={this.toggleMenu} >
        <DropdownToggle>
          <FontAwesomeIcon icon='ellipsis-h' />
        </DropdownToggle>
        <DropdownMenu>
          {dropdownItemNodes}
        </DropdownMenu>
      </Dropdown>
    )
  }

}
