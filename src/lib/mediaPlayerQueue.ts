const kPriorityQueue = 'mediaPlayerPriorityQueue'
const kSecondaryQueue = 'mediaPlayerSecondaryQueue'

export const popNextFromQueue = () => {
  let nextItem
  const nextPriorityItem = popNextFromPriorityQueue()

  if (nextPriorityItem) {
    nextItem = nextPriorityItem
  } else {
    const nextSecondaryItem = popNextFromSecondaryQueue()

    if (nextSecondaryItem) {
      nextItem = nextSecondaryItem
    }
  }

  const priorityItems = getPriorityQueueItems()
  const secondaryItems = getSecondaryQueueItems()

  return {
    nextItem,
    priorityItems,
    secondaryItems
  }
}

export const addItemToPriorityQueue = (newItem, isLast) => {
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

export const getPriorityQueueItems = () => {
  const jsonItems = localStorage.getItem(kPriorityQueue)
  if (jsonItems) {
    return JSON.parse(jsonItems)
  }
}

export const popNextFromPriorityQueue = () => {
  const items = getPriorityQueueItems()

  if (items.length > 0) {
    const nextItem = items.shift()
    localStorage.setItem(kPriorityQueue, JSON.stringify(items))
    return nextItem
  }
}

export const removeItemFromPriorityQueue = (item) => {
  const queueItems = localStorage.getItem(kPriorityQueue)

  if (queueItems) {
    const items = JSON.parse(queueItems)
    const newItems = items.filter(obj => obj.id !== item.id)
    localStorage.setItem(kPriorityQueue, JSON.stringify(newItems))
  }
}

export const clearItemsFromPriorityQueue = (item) => {
  localStorage.setItem(kPriorityQueue, JSON.stringify([]))
}

export const addItemsToSecondaryQueue = (newItems) => {
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

export const getSecondaryQueueItems = () => {
  const jsonItems = localStorage.getItem(kSecondaryQueue)
  if (jsonItems) {
    return JSON.parse(jsonItems)
  }
}

export const popNextFromSecondaryQueue = () => {
  const items = getSecondaryQueueItems()

  if (items.length > 0) {
    const nextItem = items.shift()
    localStorage.setItem(kSecondaryQueue, JSON.stringify(items))
    return nextItem
  }
}

export const clearItemsFromSecondaryQueue = (item) => {
  localStorage.setItem(kSecondaryQueue, JSON.stringify([]))
}
