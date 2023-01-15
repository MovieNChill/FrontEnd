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
import MediaPoster from './MediaPoster';

interface Props {
  title?: string;
  medias: MediaDTO[];
}

const MediasRow = ({ title, medias }: Props) => {
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
