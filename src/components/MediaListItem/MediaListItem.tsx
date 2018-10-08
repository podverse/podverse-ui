import * as React from 'react'
import { MediaListItemA } from './MediaListItemA/MediaListItemA'
import { MediaListItemB } from './MediaListItemB/MediaListItemB'
import { MediaListItemC } from './MediaListItemC/MediaListItemC'
import { readableDate } from 'lib/util'

const striptags = require('striptags')

export interface Props {
  dataClip: any
  dataEpisode: any
  dataPodcast: any
  handleOnClick?: () => void
  itemType: string
}

export const MediaListItem = (props: Props) => {
  const { dataClip, dataEpisode, dataPodcast, handleOnClick,
    itemType } = props 
  
  return (
    <a 
      className='media-list__item'
      href='#'
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
            subTitleTop={dataClip.startTime}
            subTitleTopSide='duration'
            title={dataClip.title} />
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
