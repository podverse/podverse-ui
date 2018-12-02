import * as React from 'react'
import Link from 'next/link'
import { MoreDropdown } from 'components/MoreDropdown/MoreDropdown'
import { MediaListItemA } from 'components/Media/MediaListItem/MediaListItemA/MediaListItemA'
import { MediaListItemB } from 'components/Media/MediaListItem/MediaListItemB/MediaListItemB'
import { MediaListItemC } from 'components/Media/MediaListItem/MediaListItemC/MediaListItemC'
import { MediaListItemD } from 'components/Media/MediaListItem/MediaListItemD/MediaListItemD'
import { readableDate, readableClipTime, secondsToReadableDuration, calcDuration } from 'lib/utility'

const striptags = require('striptags')

type Props = {
  dataClip?: any
  dataEpisode?: any
  dataNowPlayingItem?: any
  dataPlaylist?: any
  dataPodcast?: any
  handleAddToQueueLast?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleAddToQueueNext?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleAddToPlaylist?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleAnchorOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePlayItem?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleAddToPlaylist?: (event: React.MouseEvent<HTMLButtonElement>) => void
  hasLink?: boolean
  itemType?: string
  noWrap?: boolean
  showMoreMenu?: boolean
}

export const MediaListItem: React.StatelessComponent<Props> = props => {
  const { dataClip, dataEpisode, dataNowPlayingItem, dataPlaylist, dataPodcast,
    handleAnchorOnClick, handlePlayItem, handleAddToQueueLast, handleAddToQueueNext,
    handleToggleAddToPlaylist, hasLink, itemType, noWrap, showMoreMenu } = props

  let anchorHref = ''
  let anchorAs = ''

  if (hasLink) {
    if (itemType === 'clip' || itemType === 'episode-clip' || itemType === 'podcast-clip') {
      anchorHref = `/clip?id=${dataClip.id}`
      anchorAs = `/clip/${dataClip.id}`
    } else if (itemType === 'episode' || itemType === 'podcast-episode') {
      anchorHref = `/episode?id=${dataEpisode.id}`
      anchorAs = `/episode/${dataEpisode.id}`
    } else if (itemType === 'playlist') {
      anchorHref = `/playlist?id=${dataPlaylist.id}`
      anchorAs = `/playlist/${dataPlaylist.id}`
    } else if (itemType === 'podcast') {
      anchorHref = `/podcast/${dataPodcast.id}`
      anchorAs = `/podcast/${dataPodcast.id}`
    } else if (itemType === 'now-playing-item' && (dataNowPlayingItem && dataNowPlayingItem.clipStartTime)) {
      anchorHref = `/clip?id=${dataNowPlayingItem.clipId}`
      anchorAs = `/clip/${dataNowPlayingItem.clipId}`
    } else if (itemType === 'now-playing-item' && (dataNowPlayingItem && !dataNowPlayingItem.clipStartTime)) {
      anchorHref = `/episode?id=${dataNowPlayingItem.episodeId}`
      anchorAs = `/episode/${dataNowPlayingItem.episodeId}`
    } else if (itemType === 'now-playing-item-clip-from-episode' || itemType === 'now-playing-item-clip-from-podcast') {
      anchorHref = `/clip?id=${dataNowPlayingItem.clipId}`
      anchorAs = `/clip/${dataNowPlayingItem.clipId}`
    } else if (itemType === 'now-playing-item-episode-from-podcast' || itemType === 'now-playing-item-episode-from-all-podcasts') {
      anchorHref = `/episode?id=${dataNowPlayingItem.episodeId}`
      anchorAs = `/episode/${dataNowPlayingItem.episodeId}`
    } else if (itemType === 'now-playing-item-queue-clip') {
      anchorHref = `/clip?id=${dataNowPlayingItem.clipId}`
      anchorAs = `/clip/${dataNowPlayingItem.clipId}`
    } else if (itemType === 'now-playing-item-queue-episode') {
      anchorHref = `/episode?id=${dataNowPlayingItem.episodeId}`
      anchorAs = `/episode/${dataNowPlayingItem.episodeId}`
    }
  }

  const moreMenuItems = [
    {
      icon: 'play',
      onClick: handlePlayItem,
      text: 'Play',
      value: 'play'
    },
    {
      icon: 'level-up-alt',
      onClick: handleAddToQueueNext,
      text: 'Queue: Next',
      value: 'queue-next'
    },
    {
      icon: 'level-down-alt',
      onClick: handleAddToQueueLast,
      text: 'Queue: Last',
      value: 'queue-last'
    },
    {
      icon: 'list-ul',
      onClick: handleToggleAddToPlaylist,
      text: 'Add to Playlist',
      value: 'add-to-playlist'
    }
  ]

  return (
    <div className='media-list__container'>
      <div className='media-list__left'>
        <Link
          {...(anchorHref ? { href: anchorHref } : {})}
          {...(anchorAs ? { as: anchorAs } : {})}>
          <a
            className={`media-list__item ${noWrap ? 'no-wrap' : ''}`}
            {...(dataPlaylist ? { 'data-id': dataPlaylist.id } : {})}
            onClick={handleAnchorOnClick}>
            {
              (itemType === 'clip' && dataClip) &&
                <MediaListItemA
                  imageUrl={dataClip.podcastImageUrl}
                  subTitleBottom={readableClipTime(dataClip.startTime, dataClip.endTime)}
                  subTitleBottomSide={secondsToReadableDuration(
                    calcDuration(dataClip.startTime, dataClip.endTime)
                  )}
                  subTitleMiddle={dataClip.episodeTitle}
                  subTitleMiddleSide={dataClip.episodePubDate ? readableDate(dataClip.episodePubDate) : ''}
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
                  imageUrl={dataNowPlayingItem.podcastImageUrl}
                  subTitleBottom={readableClipTime(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)}
                  subTitleBottomSide={secondsToReadableDuration(
                    calcDuration(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)
                  )}
                  subTitleMiddle={dataNowPlayingItem.episodeTitle}
                  subTitleMiddleSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                  subTitleTop={dataNowPlayingItem.podcastTitle}
                  title={dataNowPlayingItem.clipTitle} />
            }
            {
              (itemType === 'now-playing-item' && (dataNowPlayingItem && !dataNowPlayingItem.clipStartTime)) &&
                <MediaListItemA
                  imageUrl={dataNowPlayingItem.podcastImageUrl}
                  subTitleBottom='Full Episode'
                  subTitleBottomSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                  subTitleTop={dataNowPlayingItem.podcastTitle}
                  title={dataNowPlayingItem.episodeTitle} />
            }
            {
              (itemType === 'now-playing-item-clip-from-episode' && dataNowPlayingItem) &&
                <MediaListItemA
                  subTitleBottom={readableClipTime(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)}
                  subTitleBottomSide={secondsToReadableDuration(
                    calcDuration(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)
                  )}
                  title={dataNowPlayingItem.clipTitle} />
            }
            {
              (itemType === 'now-playing-item-clip-from-podcast' && dataNowPlayingItem) &&
                <MediaListItemA
                  subTitleTop={dataNowPlayingItem.episodeTitle}
                  subTitleTopSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                  subTitleBottom={readableClipTime(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)}
                  subTitleBottomSide={secondsToReadableDuration(
                    calcDuration(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)
                  )}
                  title={dataNowPlayingItem.clipTitle} />
            }
            {
              (itemType === 'now-playing-item-episode-from-podcast' && dataNowPlayingItem) &&
                <MediaListItemA
                  subTitleTopSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                  subTitleTop={'Full Episode'}
                  title={dataNowPlayingItem.episodeTitle} />
            }
            {
              (itemType === 'now-playing-item-episode-from-all-podcasts' && dataNowPlayingItem) &&
                <MediaListItemA
                  imageUrl={dataNowPlayingItem.podcastImageUrl}
                  subTitleBottom='Full Episode'
                  subTitleBottomSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                  subTitleTop={dataNowPlayingItem.podcastTitle}
                  title={dataNowPlayingItem.episodeTitle} />
            }
            {
              (itemType === 'now-playing-item-queue-clip' && dataNowPlayingItem) &&
              <MediaListItemA
                imageUrl={dataNowPlayingItem.podcastImageUrl}
                subTitleBottom={readableClipTime(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)}
                subTitleBottomSide={secondsToReadableDuration(
                  calcDuration(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)
                )}
                subTitleMiddle={dataNowPlayingItem.episodeTitle}
                subTitleMiddleSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                subTitleTop={dataNowPlayingItem.podcastTitle}
                title={dataNowPlayingItem.clipTitle} />
            }
            {
              (itemType === 'now-playing-item-queue-episode' && dataNowPlayingItem) &&
              <MediaListItemA
                imageUrl={dataNowPlayingItem.podcastImageUrl}
                subTitleBottom='Full Episode'
                subTitleBottomSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                subTitleTop={dataNowPlayingItem.podcastTitle}
                title={dataNowPlayingItem.episodeTitle} />
            }
            {
              (itemType === 'playlist' && dataPlaylist) &&
                <MediaListItemD
                  subTitle={dataPlaylist.lastUpdated ? readableDate(dataPlaylist.lastUpdated) : ''}
                  subTitleSide={`${dataPlaylist.itemCount || dataPlaylist.itemCount === 0 ? `items: ${dataPlaylist.itemCount}` : ''}`}
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
        </Link>
      </div>
      {
        showMoreMenu &&
          <div className='media-list__right'>
            <MoreDropdown items={moreMenuItems} />
          </div>
      }
    </div>
  )
}
