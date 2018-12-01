const kPriorityQueue = 'mediaPlayerPriorityQueue'
const kSecondaryQueue = 'mediaPlayerSecondaryQueue'

export const popNextFromQueueStorage = () => {
  let nextItem
  const nextPriorityItem = popNextFromPriorityQueueStorage()

  if (nextPriorityItem) {
    nextItem = nextPriorityItem
  } else {
    const nextSecondaryItem = popNextFromSecondaryQueueStorage()

    if (nextSecondaryItem) {
      nextItem = nextSecondaryItem
    }
  }

  const priorityItems = getPriorityQueueItemsStorage()
  const secondaryItems = getSecondaryQueueItemsStorage()

  return {
    nextItem,
    priorityItems,
    secondaryItems
  }
}

export const addItemToPriorityQueueStorage = (newItem, isLast) => {
  const jsonItems = localStorage.getItem(kPriorityQueue)

  if (jsonItems) {
    const items = JSON.parse(jsonItems)

    if (isLast) {
      items.push(newItem)
    } else {
      items.unshift(newItem)
    }

    localStorage.setItem(kPriorityQueue, JSON.stringify(items))
  } else {
    localStorage.setItem(kPriorityQueue, JSON.stringify([newItem]))
  }
}

export const getPriorityQueueItemsStorage = () => {
  const jsonItems = localStorage.getItem(kPriorityQueue)
  if (jsonItems) {
    return JSON.parse(jsonItems)
  }
}

export const popNextFromPriorityQueueStorage = () => {
  const items = getPriorityQueueItemsStorage()

  if (items && items.length > 0) {
    const nextItem = items.shift()
    localStorage.setItem(kPriorityQueue, JSON.stringify(items))
    return nextItem
  }
}

export const removeItemFromPriorityQueueStorage = (item) => {
  const queueItems = localStorage.getItem(kPriorityQueue)

  if (queueItems) {
    const items = JSON.parse(queueItems)
    const newItems = items.filter(obj => obj.id !== item.id)
    localStorage.setItem(kPriorityQueue, JSON.stringify(newItems))
  }
}

export const clearItemsFromPriorityQueueStorage = (item) => {
  localStorage.setItem(kPriorityQueue, JSON.stringify([]))
}

export const updatePriorityQueueStorage = (newItems) => {
  localStorage.setItem(kPriorityQueue, JSON.stringify(newItems))
}

export const addItemsToSecondaryQueueStorage = (newItems) => {
  const jsonItems = localStorage.getItem(kSecondaryQueue)

  if (jsonItems) {
    const oldItems = JSON.parse(jsonItems)
    for (const item of newItems) {
      oldItems.push(item)
    }
    localStorage.setItem(kSecondaryQueue, JSON.stringify(oldItems))
  } else {
    const items: any[] = []
    for (const item of newItems) {
      items.push(item)
    }

    localStorage.setItem(kSecondaryQueue, JSON.stringify(items))
  }
}

export const getSecondaryQueueItemsStorage = () => {
  const jsonItems = localStorage.getItem(kSecondaryQueue)
  if (jsonItems) {
    return JSON.parse(jsonItems)
  }
}

export const popNextFromSecondaryQueueStorage = () => {
  const items = getSecondaryQueueItemsStorage()

  if (items && items.length > 0) {
    const nextItem = items.shift()
    localStorage.setItem(kSecondaryQueue, JSON.stringify(items))
    return nextItem
  }
}

export const clearItemsFromSecondaryQueueStorage = (item) => {
  localStorage.setItem(kSecondaryQueue, JSON.stringify([]))
}
