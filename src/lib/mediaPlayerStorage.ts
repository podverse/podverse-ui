const kPriorityQueue = 'mediaPlayerPriorityQueue'
const kNowPlayingItem = 'nowPlayingItem'

export const popNextFromQueueStorage = () => {
  const nextItem = popNextFromPriorityQueueStorage()
  const priorityItems = getPriorityQueueItemsStorage()

  return {
    nextItem,
    priorityItems
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
