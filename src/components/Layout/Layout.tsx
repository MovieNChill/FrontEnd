import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Group,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Stack,
  useMantineColorScheme,
} from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { Link, Outlet } from 'react-router-dom';
import { Logout, Moon, Sun } from 'tabler-icons-react';
import { login } from '../../constants/routes';
import { Logo } from '../Logo';
import { MainLinks } from '../MainLinks';
import { SearchBar } from '../SearchBar';
import { ThemeColoredIcon } from '../ThemeColoredIcon';
import { UserAccount } from '../UserAccount';
import flags from './../../assets/flags.svg';
import styles from './Layout.module.scss';

export const Layout = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [menuOpened, setMenuOpened] = useScrollLock(false);

  return (
    <AppShell
      styles={{
        root: { overflowX: 'hidden' },
      }}
      padding="xl"
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!menuOpened}
          width={{
            sm: 250,
            md: 250,
            lg: 250,
            xl: 250,
          }}>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Navbar.Section mt="md">
              <Logo />
            </Navbar.Section>
          </MediaQuery>
          <Navbar.Section grow component={ScrollArea} mx="-xs" mt="md">
            <MainLinks onClick={() => setMenuOpened(false)} />
          </Navbar.Section>
          <Navbar.Section mt="md">
            <UserAccount />
          </Navbar.Section>
          <Navbar.Section mt="md">
            <Group position="center" spacing="xl">
              <ActionIcon onClick={() => toggleColorScheme()}>
                <ThemeColoredIcon
                  component={colorScheme === 'dark' ? Sun : Moon}
                />
              </ActionIcon>
              <ActionIcon
                component="img"
                src={flags}
                className={colorScheme === 'light' ? '' : styles.inverted}
                alt="Toggle language"
                onClick={() => toggleColorScheme()}
              />
            </Group>
          </Navbar.Section>
          <Navbar.Section mt="md">
            <Button
              variant="subtle"
              color="dark"
              fullWidth
              component={Link}
              to={login.path}
              leftIcon={<ThemeColoredIcon component={Logout} />}
              styles={(theme) => ({
                root: {
                  color: colorScheme === 'light' ? theme.black : theme.white,
                },
              })}>
              Log out
            </Button>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Header height={{ base: 70, sm: 0, md: 0, lg: 0, xl: 0 }} p="xs">
            <Group position="apart">
              <Burger
                opened={menuOpened}
                onClick={() => setMenuOpened((o) => !o)}
                size="sm"
                styles={(theme) => ({
                  burger: {
                    color: colorScheme === 'light' ? theme.black : theme.white,
                  },
                })}
                mr="xl"
              />
              <Logo />
            </Group>
          </Header>
        </MediaQuery>
      }>
      <Stack spacing="xl">
        <SearchBar />
        <Outlet />
      </Stack>
    </AppShell>
  );
};
