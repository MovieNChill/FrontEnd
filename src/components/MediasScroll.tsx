import { Box, SimpleGrid } from '@mantine/core';
import {
  completeNavigationProgress,
  NavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { useEffect, useState } from 'react';
import { MediaDTO } from '../entities/media';
import { mediaNameFilterHelper } from '../helpers/mediaFilterHelper';
import { getMediaWithFilter } from '../services/mediaService';
import MediaPoster from './MediaPoster';

interface Props {
  q?: string;
  mood?: string;
}

const pageSize = 12;

const MediasScroll = ({ q }: Props) => {
  const [medias, setMedias] = useState<MediaDTO[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [query, setQuery] = useState(q);

  useEffect(() => {
    const fetchData = async () => {
      resetNavigationProgress();
      startNavigationProgress();

      const res = await getMediaWithFilter({
        page: page,
        size: pageSize,
        search: query ? mediaNameFilterHelper(query) : undefined,
      });

      if (query !== q) {
        setMedias(res);
        setPage(0);
        setHasMore(true);
        setQuery(q);
      } else {
        setMedias((prevData) => prevData.concat(res));
        setHasMore(res.length === pageSize);
      }

      completeNavigationProgress();
    };
    fetchData();
  }, [page, q, query]);

  useEffect(() => {
    if (!observer && ref) {
      const newObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].intersectionRatio > 0.8 && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: [0.8] },
      );
      newObserver.observe(ref);
      setObserver(newObserver);
    }
    return () => observer && observer.disconnect();
  }, [observer, ref, setPage, hasMore]);

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
        {renderGrid(medias)}
      </SimpleGrid>
      <div ref={setRef} />
    </>
  );
};

export default MediasScroll;
