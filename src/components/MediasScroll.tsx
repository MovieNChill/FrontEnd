import { Box, SimpleGrid } from '@mantine/core';
import {
  completeNavigationProgress,
  NavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { useEffect, useRef, useState } from 'react';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import { MediaDTO } from '../entities/media';
import { mediaFilterHelper } from '../helpers/mediaFilterHelper';
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

interface State {
  medias: MediaDTO[];
  page: number;
  hasMore: boolean;
}

const pageSize = 12;

const MediasScroll = ({ q }: Props) => {
  const [{ medias, page, hasMore }, setState] = useState<State>({
    medias: [],
    page: 0,
    hasMore: true,
  });

  useEffect(() => {
    setState({
      medias: [],
      page: 0,
      hasMore: true,
    });
  }, [q]);

  const viewport = useRef<HTMLDivElement>(null);

  const [mediasFn, getMedias] = useAsyncFn(
    async (page: number, query?: string) => {
      resetNavigationProgress();
      startNavigationProgress();

      const res = await getMediaWithFilter({
        page: page,
        size: pageSize,
        search: query ? mediaFilterHelper(query) : undefined,
      });
      console.log(res);
      completeNavigationProgress();
      setState((prevState) => ({
        medias: [...prevState.medias],
        page: prevState.page + 1,
        hasMore: res.length === pageSize,
      }));
      return res;
    },
    [],
  );

  useEffect(() => {
    if (!viewport.current) return;
    if (
      viewport.current &&
      viewport.current.scrollHeight - viewport.current.scrollTop ===
        viewport.current.clientHeight &&
      mediasFn.loading !== true &&
      hasMore
    ) {
      getMedias(page, q);
    }
  }, [viewport.current?.scroll, mediasFn.loading, hasMore, q]);

  const renderGrid = (_medias?: MediaDTO[]) => {
    const __medias = _medias ?? Array.from({ length: pageSize });
    return __medias.map((media, i) => (
      <Box key={i} mx="auto">
        <MediaPoster media={media} />
      </Box>
    ));
  };

  return (
    <>
      <NavigationProgress />
      <SimpleGrid
        ref={viewport}
        cols={4}
        spacing="md"
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: 'lg', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'xs' },
          { maxWidth: 'xs', cols: 1, spacing: 'xs' },
        ]}>
        {renderGrid(medias)}
      </SimpleGrid>
    </>
  );
};

export default MediasScroll;
