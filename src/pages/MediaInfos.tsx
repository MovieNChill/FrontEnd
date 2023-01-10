import {
  ActionIcon,
  Badge,
  Divider,
  Group,
  Rating,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Bookmark } from 'tabler-icons-react';
import media from '../assets/media1.svg';
import MediasRow from '../components/MediasRow';
import ThemeColoredIcon from '../components/ThemeColoredIcon';

const MediaInfos = () => {
  const theme = useMantineTheme();
  const sm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  return (
    <>
      <Group align={sm ? 'center' : 'flex-start'} spacing="sm" noWrap={!sm}>
        <img src={media} alt="poster" style={{ margin: 'auto' }} />
        <Stack spacing="sm">
          <Group spacing="sm">
            <Text weight="bold" size="lg">
              Top Gun: Maverick • 2022 • PG-13 • 2h 10m
            </Text>
            <Group spacing="xs">
              <Rating defaultValue={1} size="sm" readOnly count={1} />
              <Text weight="bold">8.1</Text>
              <Text c="dimmed">| 350k</Text>
            </Group>

            <Badge color="gray" variant="outline">
              Action
            </Badge>
            <Badge color="gray" variant="outline">
              Drama
            </Badge>
          </Group>
          <Text>
            After thirty years, Maverick is still pushing the envelope as a top
            naval aviator, but must confront ghosts of his past when he leads
            TOP GUN's elite graduates on a mission that demands the ultimate
            sacrifice from those chosen to fly it.
          </Text>

          <Group spacing="sm">
            <Stack spacing="sm">
              <Group spacing="xs">
                <Text weight="bold">Director :</Text>
                <Text>Joseph Kosinski</Text>
              </Group>

              <Divider />

              <Group spacing="xs">
                <Text weight="bold">Writers :</Text>
                <Text>Eric Warren Singer, Peter Craig, Justin Marks</Text>
              </Group>

              <Divider />

              <Group spacing="xs">
                <Text weight="bold">Stars :</Text>
                <Text>Tom Cruise, Miles Teller, Val Kilmer</Text>
              </Group>
            </Stack>
            <Stack spacing="sm">
              <Group position="apart">
                <Rating defaultValue={0} size="sm" count={5} />
                <ActionIcon>
                  <ThemeColoredIcon component={Bookmark} />
                </ActionIcon>
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Group>
      <MediasRow title="Similar Movies" />
    </>
  );
};

export default MediaInfos;
