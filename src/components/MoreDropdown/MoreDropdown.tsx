import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
const uuidv4 = require('uuid/v4')

type Props = {
  className?: string
  direction?: string
  handleAddToQueueLast?: any
  handleAddToQueueNext?: any
  handlePlayItem?: any
  handleToggleAddToPlaylist?: any
  handleToggleShare?: any
  t?: any
  uniqueItemKey: string
}

type State = {
  isOpen?: boolean
  items?: any
}

const getMenuItems = (props) => {
  const { handleAddToQueueLast, handleAddToQueueNext, handlePlayItem, handleToggleAddToPlaylist,
    handleToggleShare, t } = props
  const menuItems = [] as any

  if (handlePlayItem) {
    menuItems.push({
      icon: 'play',
      onClick: handlePlayItem,
      text: t('Play'),
      value: 'play'
    })
  }

  if (handleAddToQueueNext) {
    menuItems.push({
      icon: 'level-up-alt',
      onClick: handleAddToQueueNext,
      text: t('Queue Next'),
      value: 'queue-next'
    })
  }

  if (handleAddToQueueLast) {
    menuItems.push({
      icon: 'level-down-alt',
      onClick: handleAddToQueueLast,
      text: t('Queue Last'),
      value: 'queue-last'
    })
  }

  if (handleToggleAddToPlaylist) {
    menuItems.push({
      icon: 'list-ul',
      onClick: handleToggleAddToPlaylist,
      text: t('Add to Playlist'),
      value: 'add-to-playlist'
    })
  }

  if (handleToggleShare) {
    menuItems.push({
      icon: 'share',
      onClick: handleToggleShare,
      text: t('Share'),
      value: 'share'
    })
  }

  return menuItems
}

export class MoreDropdown extends React.Component<Props, State> {

  static defaultProps: Props = {
    direction: 'left',
    uniqueItemKey: uuidv4()
  }

  constructor (props) {
    super(props)
    const items = getMenuItems(props)

    this.state = {
      isOpen: false,
      items
    }
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const { className, direction, uniqueItemKey } = this.props
    const { isOpen, items } = this.state

    const dropdownItemNodes = items.map((x, index) =>
      <DropdownItem
        data-value={x.value}
        key={`${uniqueItemKey}${index}`}
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
