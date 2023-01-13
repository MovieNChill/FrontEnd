import {
  ActionIcon,
  Badge,
  Col,
  Divider,
  Grid,
  Group,
  Loader,
  Rating,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { Bookmark } from 'tabler-icons-react';
import MediaPoster from '../components/MediaPoster';
import MediasRow from '../components/MediasRow';
import ThemeColoredIcon from '../components/ThemeColoredIcon';
import { medias } from '../constants/routes';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';
import { getMediaById } from '../services/mediaService';

const MediaInfos = () => {
  const { id } = useParams();
  const { navigate } = useNavigateWithQuery();
  if (!!!id) {
    navigate(medias.path);
    return <></>;
  }

  const theme = useMantineTheme();
  const sm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const mediaById = useAsync(() => getMediaById(id), [id]);

  if (mediaById.loading || !mediaById.value) {
    return <Loader />;
  }

  return (
    <>
      <Grid gutter={50}>
        <Col xl="content" span={12} style={{ textAlign: 'center' }}>
          <MediaPoster media={mediaById.value} isLink={false} />
        </Col>
        <Col xl="auto">
          <Grid>
            <Col span={12}>
              <Group spacing="sm">
                <Text weight="bold" size="lg">
                  {`${mediaById.value.name} ${
                    mediaById.value.releaseDate
                      ? `• ${new Date(
                          mediaById.value.releaseDate,
                        ).getFullYear()}`
                      : ''
                  }`}
                </Text>
                <Group spacing="xs">
                  <Rating defaultValue={1} size="sm" readOnly count={1} />
                  <Text weight="bold">8.1k</Text>
                  <Text c="dimmed">| 350k</Text>
                </Group>

                {mediaById.value.genre?.map((g) => (
                  <Badge color="gray" variant="outline">
                    {g}
                  </Badge>
                ))}
              </Group>
              <Text>{mediaById.value.description}</Text>
            </Col>
            <Col span={12}>
              <Grid>
                <Col span={8}>
                  <Stack spacing="sm">
                    <Group spacing="xs">
                      <Text weight="bold">Director :</Text>
                      <Text>{mediaById.value.director}</Text>
                    </Group>

                    <Divider />

                    <Group spacing="xs">
                      <Text weight="bold">Writers :</Text>
                      <Text>{mediaById.value.writers?.join(', ')}</Text>
                    </Group>

                    <Divider />

                    <Group spacing="xs">
                      <Text weight="bold">Stars :</Text>
                      <Text>{mediaById.value.stars?.join(', ')}</Text>
                    </Group>
                  </Stack>
                </Col>
                <Col span={4}>
                  <Stack spacing="sm">
                    <Group position="apart">
                      <Rating defaultValue={0} size="sm" count={5} />
                      <ActionIcon>
                        <ThemeColoredIcon component={Bookmark} />
                      </ActionIcon>
                    </Group>
                  </Stack>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </Col>
      </Grid>
      <Group align={sm ? 'center' : 'flex-start'} spacing="sm" noWrap={!sm}>
        <Stack spacing="sm">
          <Group spacing="sm" position="apart"></Group>
        </Stack>
      </Group>
      <MediasRow title="Similar Movies" />
    </>
  );
};

export default MediaInfos;
