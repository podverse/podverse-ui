import * as React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
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
  dataUser?: any
  handleAddToQueueLast?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleAddToQueueNext?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleAddToPlaylist?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  handlePlayItem?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleRemoveItem?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleToggleAddToPlaylist?: (event: React.MouseEvent<HTMLButtonElement>) => void
  hasLink?: boolean
  isActive?: boolean
  isSlim?: boolean
  itemType?: string
  loadingItemId?: string
  noWrap?: boolean
  showMoreMenu?: boolean
  showOwner?: boolean
  showRemove?: boolean
}

// This is absolute chaos. Sorry :(

export const MediaListItem: React.StatelessComponent<Props> = props => {
  const { dataClip, dataEpisode, dataNowPlayingItem, dataPlaylist, dataPodcast, dataUser,
    handleLinkClick, handleAddToQueueLast, handleAddToQueueNext, handlePlayItem,
    handleRemoveItem, handleToggleAddToPlaylist, hasLink, isActive, isSlim, itemType,
    loadingItemId, noWrap, showMoreMenu, showOwner, showRemove } = props

  let anchorHref = ''
  let anchorAs = ''

  if (hasLink) {
    if (itemType === 'clip' || itemType === 'episode-clip' || itemType === 'podcast-clip') {
      anchorHref = `/clip?id=${dataClip.id}&scrollToTop=true`
      anchorAs = `/clip/${dataClip.id}`
    } else if (itemType === 'episode' || itemType === 'podcast-episode') {
      anchorHref = `/episode?id=${dataEpisode.id}&scrollToTop=true`
      anchorAs = `/episode/${dataEpisode.id}`
    } else if (itemType === 'playlist') {
      anchorHref = `/playlist?id=${dataPlaylist.id}&scrollToTop=true`
      anchorAs = `/playlist/${dataPlaylist.id}`
    } else if (itemType === 'podcast') {
      anchorHref = `/podcast?id=${dataPodcast.id}&scrollToTop=true`
      anchorAs = `/podcast/${dataPodcast.id}`
    } else if (itemType === 'now-playing-item' && (dataNowPlayingItem && dataNowPlayingItem.clipStartTime)) {
      anchorHref = `/clip?id=${dataNowPlayingItem.clipId}&scrollToTop=true`
      anchorAs = `/clip/${dataNowPlayingItem.clipId}`
    } else if (itemType === 'now-playing-item' && (dataNowPlayingItem && !dataNowPlayingItem.clipStartTime)) {
      anchorHref = `/episode?id=${dataNowPlayingItem.episodeId}&scrollToTop=true`
      anchorAs = `/episode/${dataNowPlayingItem.episodeId}`
    } else if (itemType === 'now-playing-item-clip-from-episode' || itemType === 'now-playing-item-clip-from-podcast') {
      anchorHref = `/clip?id=${dataNowPlayingItem.clipId}&scrollToTop=true`
      anchorAs = `/clip/${dataNowPlayingItem.clipId}`
    } else if (itemType === 'now-playing-item-episode-from-podcast' || itemType === 'now-playing-item-episode-from-all-podcasts') {
      anchorHref = `/episode?id=${dataNowPlayingItem.episodeId}&scrollToTop=true`
      anchorAs = `/episode/${dataNowPlayingItem.episodeId}`
    } else if (itemType === 'now-playing-item-queue-clip') {
      anchorHref = `/clip?id=${dataNowPlayingItem.clipId}&scrollToTop=true`
      anchorAs = `/clip/${dataNowPlayingItem.clipId}`
    } else if (itemType === 'now-playing-item-queue-episode') {
      anchorHref = `/episode?id=${dataNowPlayingItem.episodeId}&scrollToTop=true`
      anchorAs = `/episode/${dataNowPlayingItem.episodeId}`
    } else if (itemType === 'user') {
      anchorHref = `/profile?id=${dataUser.id}&scrollToTop=true`
      anchorAs = `/profile/${dataUser.id}`
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
    <div className={`media-list__container ${isActive ? 'is-active' : ''} ${isSlim ? 'is-slim' : ''}`}>
      <div className='media-list__left'>
        <Link
          {...(anchorHref ? { href: anchorHref } : {})}
          {...(anchorAs ? { as: anchorAs } : {})}>
          <a
            className={`media-list__item ${noWrap ? 'no-wrap' : ''}`}
            {...(dataPlaylist ? { 'data-id': dataPlaylist.id } : {})}
            onClick={handleLinkClick}>
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
              (itemType === 'now-playing-item' && (dataNowPlayingItem && !dataNowPlayingItem.clipStartTime && dataNowPlayingItem.episodeId)) &&
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
                  subTitleTop='Full Episode'
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
                  itemId={dataPlaylist.id}
                  loadingItemId={loadingItemId}
                  subTitleSide={showOwner ? readableDate(dataPlaylist.updatedAt) : ''}
                  subTitle={showOwner && dataPlaylist.owner ? `By: ${dataPlaylist.owner.name}` : ''}
                  title={dataPlaylist.title}
                  titleSide={`${dataPlaylist.itemCount || dataPlaylist.itemCount === 0
                    ? `items: ${dataPlaylist.itemCount}` : ''}`} />
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
            {
              (itemType === 'user' && dataUser) &&
              <MediaListItemD
                itemId={dataUser.id}
                title={dataUser.name || 'anonymous'} />
            }
          </a>
        </Link>
      </div>
      {
        (showMoreMenu || showRemove) &&
          <div className='media-list__right'>
            {
              showMoreMenu &&
                <MoreDropdown items={moreMenuItems} />
            }
            {
              showRemove &&
                <Button
                  className='media-list-right__remove'
                  onClick={handleRemoveItem}>
                  <FontAwesomeIcon icon='times' />
                </Button>
            }
          </div>
      }
    </div>
  )
}
