import { Carousel } from '@mantine/carousel';
import {
  Group,
  Space,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { mediaInfos } from '../constants/routes';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';
import media1 from './../assets/media1.svg';
import media2 from './../assets/media2.svg';
import media3 from './../assets/media3.svg';
import media4 from './../assets/media4.svg';

const medias = [media1, media2, media3, media4];

interface Props {
  title?: string;
}

export const MediasRow = ({ title }: Props) => {
  const theme = useMantineTheme();
  const lg = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`);
  const xs = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { navigate } = useNavigateWithQuery();

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
            <img
              onClick={() => navigate(mediaInfos.getPath('bengz'))}
              style={{ cursor: 'pointer' }}
              src={media}
              alt="media"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};
