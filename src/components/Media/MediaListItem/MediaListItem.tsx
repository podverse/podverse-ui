import * as React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { MoreDropdown } from 'components/MoreDropdown/MoreDropdown'
import { MediaListItemA } from 'components/Media/MediaListItem/MediaListItemA/MediaListItemA'
import { MediaListItemB } from 'components/Media/MediaListItem/MediaListItemB/MediaListItemB'
import { MediaListItemD } from 'components/Media/MediaListItem/MediaListItemD/MediaListItemD'
import { readableDate, readableClipTime } from 'lib/utility'
const sanitizeHtml = require('sanitize-html')
const striptags = require('striptags')

type Props = {
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
  hideDescription?: boolean
  hideDivider?: boolean
  isActive?: boolean
  isSlim?: boolean
  itemType?: string
  loadingItemId?: string
  noWrap?: boolean
  showMoreMenu?: boolean
  showMove?: boolean
  showOwner?: boolean
  showRemove?: boolean
}

// This is absolute chaos. Sorry :(

export const MediaListItem: React.StatelessComponent<Props> = props => {
  const { dataEpisode, dataNowPlayingItem, dataPlaylist, dataPodcast, dataUser,
    handleLinkClick, handleAddToQueueLast, handleAddToQueueNext, handlePlayItem,
    handleRemoveItem, handleToggleAddToPlaylist, hasLink, hideDescription, hideDivider,
    isActive, isSlim, itemType, loadingItemId, noWrap, showMoreMenu, showMove, showOwner,
    showRemove } = props

  let anchorHref = ''
  let anchorAs = ''

  if (hasLink) {
    if (itemType === 'podcast-episode') {
      anchorHref = `/episode?id=${dataEpisode.id}`
      anchorAs = `/episode/${dataEpisode.id}`
    } else if (itemType === 'playlist') {
      anchorHref = `/playlist?id=${dataPlaylist.id}`
      anchorAs = `/playlist/${dataPlaylist.id}`
    } else if (itemType === 'podcast') {
      anchorHref = `/podcast?id=${dataPodcast.id}`
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
    } else if (itemType === 'user') {
      anchorHref = `/profile?id=${dataUser.id}`
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
    <React.Fragment>
      <div className={`media-list__container ${isActive ? 'is-active' : ''} ${isSlim ? 'is-slim' : ''}`}>
        <div className='media-list__left'>
          <Link
            {...(anchorHref ? { href: anchorHref } : { href: '' })}
            {...(anchorAs ? { as: anchorAs } : {})}>
            <a
              className={`media-list__item ${noWrap ? 'no-wrap' : ''}`}
              {...(dataPlaylist ? { 'data-id': dataPlaylist.id } : {})}
              onClick={handleLinkClick}
              tabIndex={0}>
              {
                (itemType === 'now-playing-item' && (dataNowPlayingItem && (dataNowPlayingItem.clipStartTime || dataNowPlayingItem.clipStartTime === 0))) &&
                  <MediaListItemA
                    imageUrl={dataNowPlayingItem.podcastImageUrl}
                    subTitleMiddle={dataNowPlayingItem.episodeTitle}
                    subTitleMiddleSide={readableClipTime(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)}
                    subTitleTop={dataNowPlayingItem.podcastTitle}
                    subTitleTopSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                    title={dataNowPlayingItem.clipTitle || 'Untitled clip' } />
              }
              {
                (itemType === 'now-playing-item' && (dataNowPlayingItem && (!dataNowPlayingItem.clipStartTime && dataNowPlayingItem.clipStartTime !== 0) && dataNowPlayingItem.episodeId)) &&
                  <MediaListItemA
                    imageUrl={dataNowPlayingItem.podcastImageUrl}
                    subTitleMiddle={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                    subTitleTop={dataNowPlayingItem.podcastTitle}
                    title={dataNowPlayingItem.episodeTitle} />
              }
              {
                (itemType === 'now-playing-item-clip-from-episode' && dataNowPlayingItem) &&
                  <MediaListItemA
                    subTitleBottom={readableClipTime(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)}
                    title={dataNowPlayingItem.clipTitle} />
              }
              {
                (itemType === 'now-playing-item-clip-from-podcast' && dataNowPlayingItem) &&
                  <MediaListItemA
                    subTitleBottom={readableClipTime(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)}
                    subTitleTop={dataNowPlayingItem.episodeTitle}
                    subTitleTopSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                    title={dataNowPlayingItem.clipTitle} />
              }
              {
                (itemType === 'now-playing-item-episode-from-podcast' && dataNowPlayingItem) &&
                  <MediaListItemA
                    subTitleTop={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                    title={dataNowPlayingItem.episodeTitle} />
              }
              {
                (itemType === 'now-playing-item-episode-from-all-podcasts' && dataNowPlayingItem) &&
                  <MediaListItemA
                    imageUrl={dataNowPlayingItem.podcastImageUrl}
                    subTitleMiddle={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                    subTitleTop={dataNowPlayingItem.podcastTitle}
                    title={dataNowPlayingItem.episodeTitle} />
              }
              {
                (itemType === 'now-playing-item-queue-clip' && dataNowPlayingItem) &&
                  <MediaListItemA
                    imageUrl={dataNowPlayingItem.podcastImageUrl}
                    subTitleMiddle={dataNowPlayingItem.episodeTitle}
                    subTitleMiddleSide={readableClipTime(dataNowPlayingItem.clipStartTime, dataNowPlayingItem.clipEndTime)}
                    subTitleTop={dataNowPlayingItem.podcastTitle}
                    subTitleTopSide={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
                    title={dataNowPlayingItem.clipTitle} />
              }
              {
                (itemType === 'now-playing-item-queue-episode' && dataNowPlayingItem) &&
                  <MediaListItemA
                    imageUrl={dataNowPlayingItem.podcastImageUrl}
                    subTitleMiddle={dataNowPlayingItem.episodePubDate ? readableDate(dataNowPlayingItem.episodePubDate) : ''}
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
                    imageUrl={dataPodcast.shrunkImageUrl || dataPodcast.imageUrl}
                    subTitle={dataPodcast.lastEpisodeTitle}
                    subTitleSide={dataPodcast.lastEpisodePubDate ? readableDate(dataPodcast.lastEpisodePubDate) : ''}
                    title={dataPodcast.title} />
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
          (showMoreMenu || showRemove || showMove) &&
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
              {
                showMove &&
                  <Button className='media-list-right__move'>
                    <FontAwesomeIcon icon='bars' />
                  </Button>
              }
            </div>
        }
        {
          (
            !hideDescription
            && ((itemType === 'now-playing-item' && (dataNowPlayingItem && (!dataNowPlayingItem.clipStartTime && dataNowPlayingItem.clipStartTime !== 0) && dataNowPlayingItem.episodeId))
            || (itemType === 'now-playing-item-episode-from-podcast' && dataNowPlayingItem)
            || (itemType === 'now-playing-item-episode-from-all-podcasts' && dataNowPlayingItem))) &&
            <div className='media-list__bottom'>
              {sanitizeHtml(striptags(dataNowPlayingItem.episodeDescription))}
            </div>
        }
      </div>
      {
        !hideDivider &&
          <hr className='pv-divider' />
      }
    </React.Fragment>
  )
}
