import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Stack,
  useMantineColorScheme,
} from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const Layout = () => {
  const { colorScheme } = useMantineColorScheme();
  const [menuOpened, setMenuOpened] = useScrollLock(false);

  return (
    <AppShell
      styles={{
        root: { overflowX: 'hidden' },
      }}
      padding="xl"
      navbarOffsetBreakpoint="sm"
      navbar={<NavBar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />}
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

export default Layout;
