import * as React from 'react'
import * as Modal from 'react-modal'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'

export interface Props {
  handleAnchorOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleDragEnd?: any
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  historyItems?: any[]
  isLoggedIn?: boolean
  isOpen: boolean
  nowPlayingItem?: any
  priorityItems: any[]
  secondaryItems: any[]
}

type State = {
  dropdownMenuOpen?: boolean
  showHistory?: boolean
}

const customStyles = {
  content: {
    bottom: 'unset',
    height: 'calc(100% - 72px)',
    left: '50%',
    maxWidth: '480px',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

export class QueueModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {}

    this.hideModal = this.hideModal.bind(this)
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this)
  }

  onDragEnd = (data) => {
    let { handleDragEnd, priorityItems, secondaryItems } = this.props
    const { destination, source } = data

    let itemToMove: any = []

    if (destination && source) {
      if (source.droppableId === 'priority-items') {
        itemToMove = priorityItems.splice(source.index, 1)
      } else if (source.droppableId === 'secondary-items') {
        itemToMove = secondaryItems.splice(source.index, 1)
      }

      if (itemToMove.length > 0) {
        if (destination.droppableId === 'priority-items') {
          priorityItems.splice(destination.index, 0, itemToMove[0])
        } else if (destination.droppableId === 'secondary-items') {
          secondaryItems.splice(destination.index, 0, itemToMove[0])
        }
      }
    }

    handleDragEnd(priorityItems, secondaryItems)
  }

  toggleDropdownMenu () {
    this.setState({
      dropdownMenuOpen: !this.state.dropdownMenuOpen
    })
  }

  hideModal (event) {
    const { handleHideModal } = this.props

    if (handleHideModal) {
      handleHideModal(event)
      this.setState({ showHistory: false })
    }
  }

  render () {
    const { handleAnchorOnClick, historyItems = [], isLoggedIn, isOpen,
      nowPlayingItem = {}, priorityItems = [], secondaryItems = [] } = this.props
    const { dropdownMenuOpen, showHistory } = this.state

    const dropdownNode = (
      <React.Fragment>
        {
          isLoggedIn &&
            <React.Fragment>
              <Dropdown
                direction='down'
                isOpen={dropdownMenuOpen}
                toggle={this.toggleDropdownMenu}>
                <DropdownToggle
                  caret
                  className='header-dropdown transparent' >
                  {
                    !showHistory ?
                      <React.Fragment>
                        <FontAwesomeIcon icon='list-ul' /> &nbsp;Queue
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <FontAwesomeIcon icon='history' /> &nbsp;History
                      </React.Fragment>
                  }
                </DropdownToggle>
                <DropdownMenu>
                  {
                    !showHistory &&
                    <DropdownItem
                      onClick={() => this.setState({ showHistory: true })}>
                      <FontAwesomeIcon icon='history' /> &nbsp;History
                    </DropdownItem>
                  }
                  {
                    showHistory &&
                    <DropdownItem
                      onClick={() => this.setState({ showHistory: false })}>
                      <FontAwesomeIcon icon='list-ul' /> &nbsp;Queue
                    </DropdownItem>
                  }
                </DropdownMenu>
              </Dropdown>
            </React.Fragment>
        }
        {
          !isLoggedIn &&
            <React.Fragment>
              <h4><FontAwesomeIcon icon='list-ul' /> &nbsp;Queue</h4>
            </React.Fragment>
        }
      </React.Fragment>
    )

    let priorityItemNodes: any = []
    let secondaryItemNodes: any = []
    let historyItemNodes: any = []

    if (!showHistory) {
      priorityItemNodes = priorityItems.map((x, index) => (
        <Draggable draggableId={`priority-item-${index}`} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <MediaListItem
                dataNowPlayingItem={x}
                handleAnchorOnClick={handleAnchorOnClick}
                hasLink
                itemType='now-playing-item' />
            </div>
          )}
        </Draggable>
      ))

      secondaryItemNodes = secondaryItems.map((x, index) => (
        <Draggable draggableId={`secondary-item-${index}`} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <MediaListItem
                dataNowPlayingItem={x}
                handleAnchorOnClick={handleAnchorOnClick}
                hasLink
                itemType='now-playing-item' />
            </div>
          )}
        </Draggable>
      ))
    } else {
      historyItemNodes = historyItems.map((x, index) => (
        <MediaListItem
          dataNowPlayingItem={x}
          hasLink
          itemType='now-playing-item' />
      ))
      historyItemNodes.reverse()
    }

    let appEl
    // @ts-ignore
    if (process.browser) {
      appEl = document.querySelector('body')
    }

    const isClip = nowPlayingItem.clipId ? true : false
    const itemType = isClip ? 'now-playing-item-queue-clip' : 'now-playing-item-queue-episode'

    return (
      <Modal
        appElement={appEl}
        contentLabel='Queue'
        isOpen={isOpen}
        onRequestClose={this.hideModal}
        portalClassName='mp-queue-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        {dropdownNode}
        <CloseButton onClick={this.hideModal} />
        <div className='scrollable-area'>
          {
            !showHistory &&
              <React.Fragment>
                {
                  nowPlayingItem &&
                  <React.Fragment>
                    <h6>Now Playing</h6>
                    <MediaListItem
                      dataNowPlayingItem={nowPlayingItem}
                      hasLink
                      itemType={itemType} />
                  </React.Fragment>
                }
                <DragDropContext
                  onDragEnd={this.onDragEnd}>
                  {
                    priorityItemNodes.length > 0 &&
                    <React.Fragment>
                      <h6>Next Up</h6>
                      <Droppable droppableId='priority-items'>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'transparent' }}
                            {...provided.droppableProps}>
                            {priorityItemNodes}
                          </div>
                        )}
                      </Droppable>
                    </React.Fragment>
                  }
                  {
                    secondaryItemNodes.length > 0 &&
                    <React.Fragment>
                      <h6>Auto Queue</h6>
                      <Droppable droppableId='secondary-items'>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'transparent' }}
                            {...provided.droppableProps}>
                            {secondaryItemNodes}
                          </div>
                        )}
                      </Droppable>
                    </React.Fragment>
                  }
                </DragDropContext>
              </React.Fragment>
          }
          {
            showHistory &&
              historyItemNodes
          }
        </div>
      </Modal>
    )
  }
}
