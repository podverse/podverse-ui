import * as React from 'react'
import { MoreDropdown } from 'components/MoreDropdown/MoreDropdown'
import { MediaListItemA } from 'components/Media/MediaListItem/MediaListItemA/MediaListItemA'
import { MediaListItemB } from 'components/Media/MediaListItem/MediaListItemB/MediaListItemB'
import { MediaListItemC } from 'components/Media/MediaListItem/MediaListItemC/MediaListItemC'
import { MediaListItemD } from 'components/Media/MediaListItem/MediaListItemD/MediaListItemD'
import { readableDate } from 'lib/util'

const striptags = require('striptags')

type Props = {
  dataClip?: any
  dataEpisode?: any
  dataNowPlayingItem?: any
  dataPlaylist?: any
  dataPodcast?: any
  handleOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  itemType: string
  noWrap?: boolean
  showMoreMenu?: boolean
}

const moreMenuItems = [
  {
    icon: 'play',
    onClick: () => console.log('play'),
    text: 'Play',
    value: 'play'
  },
  {
    icon: 'level-up-alt',
    onClick: () => console.log('queue next'),
    text: 'Queue: Next',
    value: 'queue-next'
  },
  {
    icon: 'level-down-alt',
    onClick: () => console.log('queue last'),
    text: 'Queue: Last',
    value: 'queue-last'
  },
  {
    icon: 'list-ul',
    onClick: () => console.log('add to playlist'),
    text: 'Add to Playlist',
    value: 'add-to-playlist'
  }
]

export const MediaListItem: React.StatelessComponent<Props> = props => {
  const { dataClip, dataEpisode, dataNowPlayingItem, dataPlaylist, dataPodcast,
    handleOnClick, itemType, noWrap, showMoreMenu } = props

  let href = ''
  if (itemType === 'clip' || itemType === 'episode-clip' || itemType === 'podcast-clip') {
    href = `/clip/${dataClip.id}`
  } else if (itemType === 'episode' || itemType === 'podcast-episode') {
    href = `/episode/${dataEpisode.id}`
  } else if (itemType === 'playlist') {
    href = `/playlist/${dataPlaylist.id}`
  } else if (itemType === 'podcast') {
    href = `/podcast/${dataPodcast.id}`
  }

  return (
    <div className='media-list__container'>
      <div className='media-list__left'>
        <a
          className={`media-list__item ${noWrap ? 'no-wrap' : ''}`}
          {...href &&
            { href }
          }
          onClick={handleOnClick}>
          {
            (itemType === 'clip' && dataClip) &&
              <MediaListItemA
                imageUrl={dataClip.podcastImageUrl}
                subTitleBottom={dataClip.episodeTitle}
                subTitleBottomSide={dataClip.episodePubDate ? readableDate(dataClip.episodePubDate) : ''}
                subTitleTop={dataClip.podcastTitle}
                title={dataClip.title} />
          }
          {
            (itemType === 'episode' && dataEpisode) &&
              <MediaListItemA
                imageUrl={dataEpisode.podcast.imageUrl}
                subTitleBottom='Full Episode'
                subTitleBottomSide={dataEpisode.pubDate ? readableDate(dataEpisode.pubDate) : ''}
                subTitleTop={dataEpisode.podcast.title}
                title={dataEpisode.title} />
          }
          {
            (itemType === 'episode-clip' && dataClip) &&
              <MediaListItemA
                showImage={false}
                subTitleTop={dataClip.startTime}
                subTitleTopSide='duration'
                title={dataClip.title} />
          }
          {
            (itemType === 'now-playing-item' && (dataNowPlayingItem && dataNowPlayingItem.clipStartTime)) &&
              <MediaListItemA
                imageUrl={dataNowPlayingItem.imageUrl}
                subTitleBottom={dataNowPlayingItem.episodeTitle}
                subTitleBottomSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                subTitleTop={dataNowPlayingItem.podcastTitle}
                title={dataNowPlayingItem.clipTitle} />
          }
          {
            (itemType === 'now-playing-item' && (dataNowPlayingItem && !dataNowPlayingItem.clipStartTime)) &&
              <MediaListItemA
                imageUrl={dataNowPlayingItem.imageUrl}
                subTitleBottom='Full Episode'
                subTitleBottomSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                subTitleTop={dataNowPlayingItem.podcastTitle}
                title={dataNowPlayingItem.episodeTitle} />
          }
          {
            (itemType === 'playlist' && dataPlaylist) &&
            <MediaListItemD
              subTitle={dataPlaylist.lastUpdated ? readableDate(dataPlaylist.lastUpdated) : ''}
              subTitleSide={`items: ${dataPlaylist.items.length}`}
              title={dataPlaylist.title} />
          }
          {
            (itemType === 'podcast' && dataPodcast) &&
              <MediaListItemB
                imageUrl={dataPodcast.imageUrl}
                subTitle={dataPodcast.lastEpisodeTitle}
                subTitleSide={dataPodcast.lastEpisodePubDate ? readableDate(dataPodcast.lastEpisodePubDate) : ''}
                title={dataPodcast.title} />
          }
          {
            (itemType === 'podcast-clip' && dataClip) &&
              <MediaListItemA
                imageUrl={dataClip.podcastImageUrl}
                moreMenuItems={moreMenuItems}
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
                title={dataClip.episodeTitle} />
          }
        </a>
      </div>
      <div className='media-list__right'>
        {
          showMoreMenu &&
            <MoreDropdown items={moreMenuItems} />
        }
      </div>
    </div>
  )
}
