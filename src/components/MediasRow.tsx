import { Carousel } from '@mantine/carousel';
import {
  Group,
  Space,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MediaDTO } from '../entities/media';
import media1 from './../assets/media1.svg';
import media2 from './../assets/media2.svg';
import media3 from './../assets/media3.svg';
import media4 from './../assets/media4.svg';
import MediaPoster from './MediaPoster';

const medias: MediaDTO[] = [
  { id: 0, imgUrl: media1, name: 'bengz' },
  { id: 1, imgUrl: media2, name: 'bengz' },
  { id: 2, imgUrl: media3, name: 'bengz' },
  { id: 3, imgUrl: media4, name: 'bengz' },
];

interface Props {
  title?: string;
}

const MediasRow = ({ title }: Props) => {
  const theme = useMantineTheme();
  const lg = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`);
  const xs = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  return (
    <div>
      <Group position="apart">
        <Text weight={500}>{title}</Text>
        <UnstyledButton>See all</UnstyledButton>
      </Group>
      <Space h="lg" />
      <Carousel
        controlsOffset="xs"
        slideSize="25%"
        slideGap="md"
        dragFree
        align="start"
        draggable
        breakpoints={[
          { maxWidth: 'lg', slideSize: '50%', slideGap: 'md' },
          { maxWidth: 'sm', slideSize: '50%', slideGap: 'xs' },
          { maxWidth: 'xs', slideSize: '100%', slideGap: 'xs' },
        ]}
        slidesToScroll={xs ? 1 : lg ? 2 : 4}
        styles={{
          viewport: {
            width: '95%',
            margin: '0 auto',
            cursor: 'grab',
          },
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
          slide: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        {medias.map((media, index) => (
          <Carousel.Slide key={index}>
            <MediaPoster media={media} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default MediasRow;
