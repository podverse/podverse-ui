import * as React from 'react'
import { MediaListItemA } from './MediaListItemA/MediaListItemA'
import { MediaListItemB } from './MediaListItemB/MediaListItemB'
import { MediaListItemC } from './MediaListItemC/MediaListItemC'
import { MediaListItemD } from './MediaListItemD/MediaListItemD'
import { readableDate } from 'lib/util'

const striptags = require('striptags')

type Props = {
  dataClip?: any
  dataEpisode?: any
  dataNowPlayingItem?: any
  dataPlaylist?: any
  dataPodcast?: any
  handleOnClick?: () => void
  itemType: string
  noWrap?: boolean
}

export const MediaListItem: React.StatelessComponent<Props> = props => {
  const { dataClip, dataEpisode, dataNowPlayingItem, dataPlaylist, dataPodcast,
    handleOnClick, itemType, noWrap } = props

  let href = ''
  if (itemType === 'clip' || itemType === 'episode-clip' || itemType === 'podcast-clip') {
    href = `/clip/${dataClip.id}`
  } else if (itemType === 'episode' || itemType === 'podcast-episode') {
    href = `/episode/${dataEpisode.id}`
  } else if (itemType === 'podcast') {
    href = `/podcast/${dataPodcast.id}`
  }

  return (
    <a
      className={`media-list__item ${noWrap ? 'no-wrap' : ''}`}
      href={href}
      onClick={handleOnClick}>
      {
        (itemType === 'clip' && dataClip) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            imageUrl={dataClip.podcastImageUrl}
            subTitleBottom={dataClip.episodeTitle}
            subTitleBottomSide={dataClip.episodePubDate ? readableDate(dataClip.episodePubDate) : ''}
            subTitleTop={dataClip.podcastTitle}
            title={dataClip.title} />
      }
      {
        (itemType === 'episode' && dataEpisode) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            imageUrl={dataEpisode.podcast.imageUrl}
            subTitleBottom='Full Episode'
            subTitleBottomSide={dataEpisode.pubDate ? readableDate(dataEpisode.pubDate) : ''}
            subTitleTop={dataEpisode.podcast.title}
            title={dataEpisode.title} />
      }
      {
        (itemType === 'episode-clip' && dataClip) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            showImage={false}
            subTitleTop={dataClip.startTime}
            subTitleTopSide='duration'
            title={dataClip.title} />
      }
      {
        (itemType === 'now-playing-item' && (dataNowPlayingItem && dataNowPlayingItem.clipStartTime)) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            imageUrl={dataNowPlayingItem.imageUrl}
            subTitleBottom={dataNowPlayingItem.episodeTitle}
            subTitleBottomSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
            subTitleTop={dataNowPlayingItem.podcastTitle}
            title={dataNowPlayingItem.clipTitle} />
      }
      {
        (itemType === 'now-playing-item' && (dataNowPlayingItem && !dataNowPlayingItem.clipStartTime)) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            imageUrl={dataNowPlayingItem.imageUrl}
            subTitleBottom='Full Episode'
            subTitleBottomSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
            subTitleTop={dataNowPlayingItem.podcastTitle}
            title={dataNowPlayingItem.episodeTitle} />
      }
      {
        (itemType === 'playlist' && dataPlaylist) &&
        <MediaListItemD
          handleOnClick={handleOnClick}
          subTitle={dataPlaylist.lastUpdated ? readableDate(dataPlaylist.lastUpdated) : ''}
          subTitleSide={`items: ${dataPlaylist.items.length}`}
          title={dataPlaylist.title} />
      }
      {
        (itemType === 'podcast' && dataPodcast) &&
          <MediaListItemB
            handleOnClick={handleOnClick}
            imageUrl={dataPodcast.imageUrl}
            subTitle={dataPodcast.lastEpisodeTitle}
            subTitleSide={dataPodcast.lastEpisodePubDate ? readableDate(dataPodcast.lastEpisodePubDate) : ''}
            title={dataPodcast.title} />
      }
      {
        (itemType === 'podcast-clip' && dataClip) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            imageUrl={dataClip.podcastImageUrl}
            subTitleBottom={dataClip.startTime}
            subTitleBottomSide={dataClip.endTime}
            subTitleTop={dataClip.episodeTitle}
            subTitleTopSide={dataClip.episodePubDate ? readableDate(dataClip.episodePubDate) : ''}
            title={dataClip.title} />
      }
      {
        (itemType === 'podcast-episode' && dataEpisode) &&
          <MediaListItemC
            date={dataEpisode.pubDate ? readableDate(dataEpisode.pubDate) : ''}
            description={striptags(dataEpisode.description)}
            handleOnClick={handleOnClick}
            title={dataClip.episodeTitle} />
      }
    </a>
  )
}
