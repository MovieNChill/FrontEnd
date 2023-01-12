import { Box, SimpleGrid } from '@mantine/core';
import {
  completeNavigationProgress,
  NavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MediaDTO } from '../entities/media';
import { getMediaWithFilter } from '../services/mediaService';
import media1 from './../assets/media1.svg';
import media2 from './../assets/media2.svg';
import media3 from './../assets/media3.svg';
import media4 from './../assets/media4.svg';
import MediaPoster from './MediaPoster';

const mediasKek: MediaDTO[] = [
  { id: 0, imgUrl: media1, name: 'bengz' },
  { id: 1, imgUrl: media2, name: 'bengz' },
  { id: 2, imgUrl: media3, name: 'bengz' },
  { id: 3, imgUrl: media4, name: 'bengz' },
  { id: 4, imgUrl: media1, name: 'bengz' },
  { id: 5, imgUrl: media2, name: 'bengz' },
  { id: 6, imgUrl: media3, name: 'bengz' },
  { id: 7, imgUrl: media4, name: 'bengz' },
  { id: 8, imgUrl: media1, name: 'bengz' },
  { id: 9, imgUrl: media2, name: 'bengz' },
  { id: 10, imgUrl: media3, name: 'bengz' },
  { id: 11, imgUrl: media4, name: 'bengz' },
  { id: 12, imgUrl: media1, name: 'bengz' },
  { id: 13, imgUrl: media2, name: 'bengz' },
  { id: 14, imgUrl: media3, name: 'bengz' },
  { id: 15, imgUrl: media4, name: 'bengz' },
  { id: 16, imgUrl: media1, name: 'bengz' },
  { id: 17, imgUrl: media2, name: 'bengz' },
  { id: 18, imgUrl: media3, name: 'bengz' },
  { id: 19, imgUrl: media4, name: 'bengz' },
];

interface Props {
  q?: string;
  mood?: string;
}

const pageSize = 12;

const MediasScroll = ({ q }: Props) => {
  const [medias, setMedias] = useState<MediaDTO[]>([]);
  const [nextPage, setNextPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const mediasFetch = useCallback(async () => {
    resetNavigationProgress();
    startNavigationProgress();

    const res = await getMediaWithFilter({
      page: nextPage,
      size: pageSize,
      //search: q,
    });
    if (res.length < pageSize) setHasMore(false);
    setMedias((p) => [...p, ...res]);
    setNextPage((p) => p + 1);
    completeNavigationProgress();
    return res;
  }, [q, nextPage, setMedias]);

  useEffect(() => {
    mediasFetch();
  }, []);

  const renderGrid = (_medias?: MediaDTO[]) => {
    const __medias = _medias ?? Array.from({ length: pageSize });
    console.log(__medias);
    return (
      <SimpleGrid
        cols={4}
        spacing="md"
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: 'lg', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'xs' },
          { maxWidth: 'xs', cols: 1, spacing: 'xs' },
        ]}>
        {__medias.map((media, i) => (
          <Box key={i} mx="auto">
            <MediaPoster media={media} />
          </Box>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <>
      <NavigationProgress />
      <InfiniteScroll
        dataLength={medias.length}
        next={mediasFetch}
        hasMore={hasMore}
        loader={renderGrid()}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        {renderGrid(medias)}
      </InfiniteScroll>
    </>
  );
};

export default MediasScroll;
