const kPriorityQueue = 'mediaPlayerPriorityQueue'
const kSecondaryQueue = 'mediaPlayerSecondaryQueue'

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

export const removeItemFromPriorityQueue = (item) => {
  const queueItems = localStorage.getItem(kPriorityQueue)

  if (queueItems) {
    const items = JSON.parse(queueItems)
    const newItems = items.filter(obj => obj.id !== item.id)
    localStorage.setItem(kPriorityQueue, JSON.stringify(newItems))
  }
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

export const clearItemsFromSecondaryQueue = (item) => {
  localStorage.setItem(kSecondaryQueue, JSON.stringify([]))
}
