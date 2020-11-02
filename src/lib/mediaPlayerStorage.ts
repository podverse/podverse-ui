const kPriorityQueue = 'mediaPlayerPriorityQueue'
const kSecondaryQueue = 'mediaPlayerSecondaryQueue'
const kNowPlayingItem = 'nowPlayingItem'

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
  try {
    if (!newItem) return
  
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
  } catch (error) {
    console.log('addItemToPriorityQueueStorage', error)
  }
}

export const getPriorityQueueItemsStorage = () => {
  try {
    const jsonItems = localStorage.getItem(kPriorityQueue)
    if (jsonItems) {
      return JSON.parse(jsonItems)
    }
  } catch (error) {
    console.log('getPriorityQueueItemsStorage', error)
    // Invalid content might be in the queue. Clear storage if an error.
    clearItemsFromPriorityQueueStorage()
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

export const removeItemFromPriorityQueueStorage = (clipId, episodeId) => {
  try {
    const queueItems = localStorage.getItem(kPriorityQueue)
  
    if (queueItems) {
      const items = JSON.parse(queueItems)
  
      if (clipId) {
        const newItems = items.filter(obj => obj.clipId !== clipId)
        localStorage.setItem(kPriorityQueue, JSON.stringify(newItems))
      } else if (episodeId) {
        const newItems = items.filter(obj => obj.episodeId !== episodeId)
        localStorage.setItem(kPriorityQueue, JSON.stringify(newItems))
      }
    }
  } catch (error) {
    console.log('removeItemFromPriorityQueueStorage', error)
  }
}

export const clearItemsFromPriorityQueueStorage = () => {
  localStorage.setItem(kPriorityQueue, JSON.stringify([]))
}

export const updatePriorityQueueStorage = (newItems) => {
  localStorage.setItem(kPriorityQueue, JSON.stringify(newItems))
}

export const addItemsToSecondaryQueueStorage = (newItems) => {
  try {
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
  } catch (error) {
    console.log('addItemsToSecondaryQueueStorage', error)
  }
}

export const getSecondaryQueueItemsStorage = () => {
  try {
    const jsonItems = localStorage.getItem(kSecondaryQueue)
    if (jsonItems) {
      return JSON.parse(jsonItems)
    }
  } catch (error) {
    console.log('getSecondaryQueueItemsStorage', error)
    // Invalid content might be in the queue. Clear storage if an error.
    clearItemsFromSecondaryQueueStorage()
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

export const removeItemFromSecondaryQueueStorage = (clipId, episodeId) => {
  try {
    const queueItems = localStorage.getItem(kSecondaryQueue)
  
    if (queueItems) {
      const items = JSON.parse(queueItems)
  
      if (clipId) {
        const newItems = items.filter(obj => obj.clipId !== clipId)
        localStorage.setItem(kSecondaryQueue, JSON.stringify(newItems))
      } else if (episodeId) {
        const newItems = items.filter(obj => obj.episodeId !== episodeId)
        localStorage.setItem(kSecondaryQueue, JSON.stringify(newItems))
      }
    }
  } catch (error) {
    console.log('removeItemFromSecondaryQueueStorage', error)
  }
}

export const clearItemsFromSecondaryQueueStorage = () => {
  localStorage.setItem(kSecondaryQueue, JSON.stringify([]))
}

export const getNowPlayingItemFromStorage = () => {
  try {
    const json = localStorage.getItem(kNowPlayingItem)
    return json ? JSON.parse(json) : null
  } catch (error) {
    return
  }
}

export const setNowPlayingItemInStorage = nowPlayingItem => {
  if (nowPlayingItem) {
    localStorage.setItem(kNowPlayingItem, JSON.stringify(nowPlayingItem))
  } else {
    localStorage.setItem(kNowPlayingItem, JSON.stringify(''))
  }
}

export const getLastHistoryItemOrNowPlayingItemFromStorage = (historyItems: any) => {
  if (historyItems && historyItems.length > 0) {
    return historyItems[0]
  } else {
    const nowPlayingItem = getNowPlayingItemFromStorage()
  
    if (nowPlayingItem) {
      return nowPlayingItem
    } else {
      const result = popNextFromQueueStorage()
  
      if (result.nextItem) {
        localStorage.setItem(kNowPlayingItem, JSON.stringify(result.nextItem))
        return result.nextItem
      } else {
        localStorage.setItem(kNowPlayingItem, '')
        return
      }
    }
  }
}
