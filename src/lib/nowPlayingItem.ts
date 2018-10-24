export type NowPlayingItem = {
  clipEndTime?: number
  clipStartTime?: number
  clipTitle?: string
  episodeMediaUrl?: string
  episodeTitle?: string
  imageUrl?: string
  podcastTitle?: string
}

export const convertToNowPlayingItem = (data) => {
  let nowPlayingItem: NowPlayingItem = {}

  // If it has a pubDate field, assume it is an Episode
  if (data.pubDate) {
    nowPlayingItem.episodeMediaUrl = data.mediaUrl
    nowPlayingItem.episodeTitle = data.title
    nowPlayingItem.imageUrl = data.podcast.imageUrl
    nowPlayingItem.podcastTitle = data.podcast.title
  } else { // Else assume it is a MediaRef
    nowPlayingItem.clipEndTime = data.endTime
    nowPlayingItem.clipStartTime = data.startTime
    nowPlayingItem.clipTitle = data.title
    nowPlayingItem.episodeMediaUrl = data.episode.mediaUrl
    nowPlayingItem.episodeTitle = data.episode.title
    nowPlayingItem.imageUrl = data.episode.podcast.imageUrl
    nowPlayingItem.podcastTitle = data.episode.podcast.title
  }

  return nowPlayingItem
}
