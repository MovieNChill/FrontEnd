import {
  Badge,
  Col,
  Divider,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import MediaPoster from '../components/MediaPoster';
import Platform from '../components/Platform';
import { medias } from '../constants/routes';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';
import { getMediaById, getMediaPlatform } from '../services/mediaService';

const parse = (str: string) => {
  const name = str.split('name=')[1];
  return name.substring(0, name.length - 1);
};

const MediaInfos = () => {
  const { id } = useParams();
  const { Navigate } = useNavigateWithQuery();
  if (!!!id) return <Navigate to={medias.path} />;

  const theme = useMantineTheme();
  const sm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const mediaById = useAsync(async () => {
    const media = await getMediaById(id);
    const platforms = await getMediaPlatform(id);
    return { ...media, platforms };
  }, [id]);

  if (mediaById.loading || !mediaById.value) {
    return <Loader />;
  }

  return (
    <>
      <Grid gutter={50}>
        <Col
          xl="content"
          span={12}
          style={{ display: 'flex', justifyContent: 'center' }}>
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
                {/* <Group spacing="xs">
                  <Rating defaultValue={1} size="sm" readOnly count={1} />
                  <Text weight="bold">8.1k</Text>
                  <Text c="dimmed">| 350k</Text>
                </Group> */}

                {mediaById.value.genres?.map((g, i) => (
                  <Badge key={i} color="gray" variant="outline">
                    {parse(g)}
                  </Badge>
                ))}
              </Group>
              <Text>{mediaById.value.description}</Text>
            </Col>
            <Col span={12}>
              <Grid gutter="xl">
                <Col xl={8} span={12}>
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
                      <Text>
                        {mediaById.value.stars?.map((s) => parse(s)).join(', ')}
                      </Text>
                    </Group>
                  </Stack>
                </Col>
                <Col xl={4} span={12}>
                  <Stack spacing="sm">
                    <Text weight="bold">Platforms :</Text>
                    <Group spacing="xs">
                      {mediaById.value.platforms?.map((p, i) => {
                        return <Platform key={i} platform={p} />;
                      })}
                    </Group>

                    {/* <Group position="apart">
                      <Rating defaultValue={0} size="sm" count={5} />
                      <ActionIcon>
                        <ThemeColoredIcon component={Bookmark} />
                      </ActionIcon>
                    </Group> */}
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
      {/* TODO backend : <MediasRow medias={mediasKek} title="Similar Movies" /> */}
    </>
  );
};

export default MediaInfos;
