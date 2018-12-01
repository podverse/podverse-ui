import * as React from 'react'
import * as Modal from 'react-modal'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { MediaListItem } from 'components/Media/MediaListItem/MediaListItem'

export interface Props {
  handleAnchorOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handleDragEnd?: any
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  nowPlayingItem?: any
  priorityItems: any[]
  secondaryItems: any[]
}

type State = {}

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

  render () {
    const { handleAnchorOnClick, handleHideModal, isOpen, nowPlayingItem = {},
      priorityItems = [], secondaryItems = [] } = this.props

    const priorityItemNodes = priorityItems.map((x, index) => (
      <Draggable draggableId={`priority-item-${index}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            {
              x.clipStartTime ?
                <MediaListItem
                  dataNowPlayingItem={x}
                  handleAnchorOnClick={handleAnchorOnClick}
                  itemType='now-playing-item' />
                : <MediaListItem
                  dataNowPlayingItem={x}
                  handleAnchorOnClick={handleAnchorOnClick}
                  itemType='now-playing-item' />
            }
          </div>
        )}
      </Draggable>
    ))

    const secondaryItemNodes = secondaryItems.map((x, index) => (
      <Draggable draggableId={`secondary-item-${index}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            {
              x.clipStartTime ?
                <MediaListItem
                  dataNowPlayingItem={x}
                  handleAnchorOnClick={handleAnchorOnClick}
                  itemType='now-playing-item' />
                : <MediaListItem
                  dataNowPlayingItem={x}
                  handleAnchorOnClick={handleAnchorOnClick}
                  itemType='now-playing-item' />
            }
          </div>
        )}
      </Draggable>
    ))

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
        onRequestClose={handleHideModal}
        portalClassName='mp-queue-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <h4><FontAwesomeIcon icon='list-ul' /> &nbsp;Queue</h4>
        <CloseButton onClick={handleHideModal} />
        <div className='scrollable-area'>
          {
            nowPlayingItem &&
            <React.Fragment>
              <h6>Now Playing</h6>
              <MediaListItem
                dataNowPlayingItem={nowPlayingItem}
                itemType={itemType}
                noWrap={true} />
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
        </div>
      </Modal>
    )
  }
}
