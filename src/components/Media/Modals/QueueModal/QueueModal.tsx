import * as React from 'react'
import * as Modal from 'react-modal'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { PVButton as Button } from 'components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { checkIfLoadingOnFrontEnd } from 'lib/utility'

export interface Props {
  handleLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleDragEnd?: any
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleRemoveItem: Function
  historyItems?: any[]
  isLoggedIn?: boolean
  isOpen: boolean
  nowPlayingItem?: any
  priorityItems: any[]
  secondaryItems: any[]
  t: any
}

type State = {
  dropdownMenuOpen?: boolean
  isEditing?: boolean
  showHistory?: boolean
}

const customStyles = {
  content: {
    bottom: 'unset',
    height: '100%',
    left: '50%',
    maxWidth: '480px',
    padding: '20px 20px 0 20px',
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
  }

  onDragEnd = data => {
    const { handleDragEnd, priorityItems, secondaryItems } = this.props
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

  toggleDropdownMenu = () => {
    this.setState({
      dropdownMenuOpen: !this.state.dropdownMenuOpen
    })
  }

  toggleEditMode = () => {
    const { isEditing } = this.state
    this.setState({ isEditing: !isEditing })
  }

  hideModal = event => {
    const { handleHideModal } = this.props

    if (handleHideModal) {
      handleHideModal(event)
      this.setState({
        isEditing: false,
        showHistory: false
      })
    }
  }

  render () {
    const { handleLinkClick, handleRemoveItem, historyItems = [], isLoggedIn, isOpen,
      nowPlayingItem = {}, priorityItems = [], secondaryItems = [], t } = this.props
    const { dropdownMenuOpen, isEditing, showHistory } = this.state

    const header = (
      <div className='queue-modal__header'>
        {
          isLoggedIn &&
            <React.Fragment>
              <Dropdown
                className='queue-modal-header__dropdown'
                direction='down'
                isOpen={dropdownMenuOpen}
                toggle={this.toggleDropdownMenu}>
                <DropdownToggle
                  caret
                  className='header-dropdown transparent' >
                  {
                    !showHistory ?
                      <React.Fragment>
                        <FontAwesomeIcon icon='list-ul' /> &nbsp;{t('Queue')}
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <FontAwesomeIcon icon='history' /> &nbsp;{t('History')}
                      </React.Fragment>
                  }
                </DropdownToggle>
                <DropdownMenu>
                  {
                    !showHistory &&
                    <DropdownItem
                      onClick={() => this.setState({ showHistory: true })}>
                      <FontAwesomeIcon icon='history' /> &nbsp;{t('History')}
                    </DropdownItem>
                  }
                  {
                    showHistory &&
                    <DropdownItem
                      onClick={() => this.setState({ showHistory: false })}>
                      <FontAwesomeIcon icon='list-ul' /> &nbsp;{t('Queue')}
                    </DropdownItem>
                  }
                </DropdownMenu>
              </Dropdown>
            </React.Fragment>
        }
        {
          !isLoggedIn &&
            <React.Fragment>
              <h3><FontAwesomeIcon icon='list-ul' /> &nbsp;{t('Queue')}</h3>
            </React.Fragment>
        }
        {
          !showHistory &&
            <div className='queue-modal-header__edit'>
              <Button
                onClick={this.toggleEditMode}>
                {
                  isEditing ?
                    <React.Fragment><FontAwesomeIcon icon='check' /> {t('Done')}</React.Fragment>
                    : <React.Fragment><FontAwesomeIcon icon='edit' /> {t('Edit')}</React.Fragment>
                }
              </Button>
            </div>
        }
        <div className='queue-modal-header__close'>
          <CloseButton onClick={this.hideModal} />
        </div>
      </div>
    )

    let priorityItemNodes: any = []
    let secondaryItemNodes: any = []
    let historyItemNodes: any = []

    if (!showHistory) {
      const queueModalPriorityItemKey = 'queueModalPriorityItemKey'
      priorityItemNodes = Array.isArray(priorityItems) ? priorityItems.map((x, index) => (
        <Draggable
          draggableId={`priority-item-${index}`}
          index={index}
          key={`${queueModalPriorityItemKey}${index}`}>
          {(provided, snapshot) => (
            <React.Fragment>
              <div
                key={`${queueModalPriorityItemKey}b${index}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                <MediaListItem
                  dataNowPlayingItem={x}
                  handleLinkClick={handleLinkClick}
                  handleRemoveItem={() => handleRemoveItem(x.clipId, x.episodeId, true)}
                  hasLink
                  hideDescription={true}
                  hideDivider={true}
                  itemType='now-playing-item'
                  key={`${queueModalPriorityItemKey}c${index}`}
                  showMove={!isEditing}
                  showRemove={isEditing}
                  t={t} />
                <hr className='pv-divider' />
              </div>
            </React.Fragment>
          )}
        </Draggable>
      )) : []

      const queueModalSecondaryItemKey = 'queueModalSecondaryItemKey'
      secondaryItemNodes = Array.isArray(secondaryItems) ? secondaryItems.map((x, index) => (
        <Draggable
          draggableId={`secondary-item-${index}`}
          index={index}
          key={`${queueModalSecondaryItemKey}${index}`}>
          {(provided, snapshot) => (
            <React.Fragment>
              <div
                key={`${queueModalSecondaryItemKey}b${index}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                <MediaListItem
                  dataNowPlayingItem={x}
                  handleLinkClick={handleLinkClick}
                  handleRemoveItem={() => handleRemoveItem(x.clipId, x.episodeId, false)}
                  hasLink
                  hideDescription={true}
                  hideDivider={true}
                  itemType='now-playing-item'
                  key={`${queueModalSecondaryItemKey}c${index}`}
                  showMove={!isEditing}
                  showRemove={isEditing}
                  t={t} />
                <hr className='pv-divider' />
              </div>
            </React.Fragment>
          )}
        </Draggable>
      )) : []
    } else {
      const queueModalHistoryItemKey = 'queueModalHistoryItemKey'
      historyItemNodes = Array.isArray(priorityItems) ? historyItems.map((x, index) => (
        <MediaListItem
          dataNowPlayingItem={x}
          hasLink
          hideDescription={true}
          key={`${queueModalHistoryItemKey}${index}`}
          itemType='now-playing-item'
          t={t} />
      )) : []
    }

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
      appEl = document.querySelector('body')
    }

    const isClip = nowPlayingItem.clipId ? true : false
    const itemType = isClip ? 'now-playing-item-queue-clip' : 'now-playing-item-queue-episode'

    return (
      <Modal
        appElement={appEl}
        contentLabel={t('Queue')}
        isOpen={isOpen}
        onRequestClose={this.hideModal}
        portalClassName='queue-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        {header}
        <div className='scrollable-area'>
          {
            !showHistory &&
              <React.Fragment>
                {
                  nowPlayingItem &&
                  <React.Fragment>
                    <h6>{t('Now Playing')}</h6>
                    <MediaListItem
                      dataNowPlayingItem={nowPlayingItem}
                      hasLink
                      hideDescription={true}
                      hideDivider={true}
                      itemType={itemType}
                      t={t} />
                  </React.Fragment>
                }
                <DragDropContext
                  onDragEnd={this.onDragEnd}>
                  {
                    priorityItemNodes.length > 0 &&
                    <React.Fragment>
                      <h6>{t('Next Up')}</h6>
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
                      <h6>{t('Auto Queue')}</h6>
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
