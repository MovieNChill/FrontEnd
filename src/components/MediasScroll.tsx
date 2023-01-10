import { Box, SimpleGrid } from '@mantine/core';
import { MediaLightDto } from '../entities/mediaDtos';
import media1 from './../assets/media1.svg';
import media2 from './../assets/media2.svg';
import media3 from './../assets/media3.svg';
import media4 from './../assets/media4.svg';
import MediaPoster from './MediaPoster';

const medias: MediaLightDto[] = [
  { id: 0, imgSrc: media1, title: 'bengz' },
  { id: 1, imgSrc: media2, title: 'bengz' },
  { id: 2, imgSrc: media3, title: 'bengz' },
  { id: 3, imgSrc: media4, title: 'bengz' },
  { id: 4, imgSrc: media1, title: 'bengz' },
  { id: 5, imgSrc: media2, title: 'bengz' },
  { id: 6, imgSrc: media3, title: 'bengz' },
  { id: 7, imgSrc: media4, title: 'bengz' },
  { id: 8, imgSrc: media1, title: 'bengz' },
  { id: 9, imgSrc: media2, title: 'bengz' },
  { id: 10, imgSrc: media3, title: 'bengz' },
  { id: 11, imgSrc: media4, title: 'bengz' },
  { id: 12, imgSrc: media1, title: 'bengz' },
  { id: 13, imgSrc: media2, title: 'bengz' },
  { id: 14, imgSrc: media3, title: 'bengz' },
  { id: 15, imgSrc: media4, title: 'bengz' },
  { id: 16, imgSrc: media1, title: 'bengz' },
  { id: 17, imgSrc: media2, title: 'bengz' },
  { id: 18, imgSrc: media3, title: 'bengz' },
  { id: 19, imgSrc: media4, title: 'bengz' },
];

const MediasScroll = () => {
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
      {medias.map((media, index) => (
        <Box mx="auto">
          <MediaPoster media={index <= 10 ? media : undefined} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MediasScroll;
