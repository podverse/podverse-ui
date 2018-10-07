import * as React from 'react'
import { MediaListItemA } from './MediaListItemA/MediaListItemA'
import { MediaListItemB } from './MediaListItemB/MediaListItemB'
import { MediaListItemC } from './MediaListItemC/MediaListItemC'

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
      href='asdf'>
      {
        (itemType === 'clip' && dataClip) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            imageUrl={dataClip.podcastImageUrl}
            subTitleBottom={dataClip.episodeTitle}
            subTitleBottomSide={dataClip.episodePubDate}
            subTitleTop={dataClip.podcastTitle}
            title={dataClip.title} />
      }
      {
        (itemType === 'episode' && dataEpisode) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            imageUrl={dataEpisode.podcast.imageUrl}
            subTitleBottom='Full Episode'
            subTitleBottomSide={dataEpisode.pubDate}
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
            subTitleSide={dataPodcast.lastEpisodePubDate}
            title={dataPodcast.title} />
      }
      {
        (itemType === 'podcast-clip' && dataClip) &&
          <MediaListItemA
            handleOnClick={handleOnClick}
            imageUrl={dataClip.episodeImageUrl}
            subTitleBottom={dataClip.startTime}
            subTitleBottomSide={dataClip.endTime}
            subTitleTop={dataClip.episodeTitle}
            subTitleTopSide={dataClip.episodePubDate}
            title={dataClip.title} />
      }
      {
        (itemType === 'podcast-episode' && dataEpisode) &&
          <MediaListItemC
            date={dataEpisode.pubDate}
            description={dataEpisode.description}
            handleOnClick={handleOnClick}
            imageUrl={dataEpisode.imageUrl}
            title={dataClip.episodeTitle} />
      }
    </a>
  )
}
