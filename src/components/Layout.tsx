import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Stack,
} from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { useColorSchemeLocalStorage } from '../hooks/useColorSchemeLocalStorage';
import Logo from './Logo';
import Navigationbar from './Navigationbar';
import Searchbar from './Searchbar';

const Layout = () => {
  const { colorScheme } = useColorSchemeLocalStorage();
  const [menuOpened, setMenuOpened] = useScrollLock(false);

  return (
    <AppShell
      styles={{
        root: { overflowX: 'hidden' },
      }}
      padding="xl"
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navigationbar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
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
        <Searchbar />
        <Outlet />
      </Stack>
    </AppShell>
  );
};

export default Layout;
