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
import Navbar from './Navbar';
import Searchbar from './Searchbar';

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
      navbar={<Navbar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />}
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
        <Searchbar />
        <Outlet />
      </Stack>
    </AppShell>
  );
};

export default Layout;
