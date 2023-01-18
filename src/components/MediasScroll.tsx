import { Box, SimpleGrid } from '@mantine/core';
import {
  completeNavigationProgress,
  NavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import { MediaDTO } from '../entities/media';
import { mediaFilterHelper } from '../helpers/mediaFilterHelper';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';
import { getMediaWithFilter } from '../services/mediaService';
import MediaPoster from './MediaPoster';

const pageSize = 12;

interface State {
  medias: MediaDTO[];
  page: number;
}

const MediasScroll = () => {
  const [state, setState] = useState<State>({
    medias: [],
    page: 0,
  });
  const [touched, setTouched] = useState<boolean>(false);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { searchParams } = useNavigateWithQuery();

  useAsync(
    () => getMedias({ page: 0, medias: [] }, searchParams.q),
    [searchParams.q],
  );

  const [, getMedias] = useAsyncFn(
    async (_state: State, query?: string) => {
      resetNavigationProgress();
      startNavigationProgress();

      const res = await getMediaWithFilter({
        page: _state.page,
        size: pageSize,
        search: query ? mediaFilterHelper(query) : undefined,
      });

      const total = [..._state.medias, ...res];
      setState({
        medias: total,
        page: _state.page + 1,
      });
      completeNavigationProgress();
      return total;
    },
    [setState, searchParams.q],
  );

  useEffect(() => {
    if (touched && state.page * pageSize === state.medias.length) {
      setTouched(false);
      getMedias(state, searchParams.q);
    }
  }, [state, getMedias, touched]);

  useEffect(() => {
    if (!observer && ref) {
      const newObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].intersectionRatio > 0.8) {
            setTouched(true);
          }
        },
        { threshold: [0.8] },
      );
      newObserver.observe(ref);
      setObserver(newObserver);
    }
    return () => observer && observer.disconnect();
  }, [observer, ref]);

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
        cols={4}
        spacing="md"
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: 'lg', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'xs' },
          { maxWidth: 'xs', cols: 1, spacing: 'xs' },
        ]}>
        {renderGrid(state.medias)}
      </SimpleGrid>
      <div ref={setRef} />
    </>
  );
};

export default MediasScroll;
