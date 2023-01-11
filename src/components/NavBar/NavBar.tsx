import {
  ActionIcon,
  Button,
  Group,
  MediaQuery,
  Navbar as MNavbar,
  ScrollArea,
  useMantineColorScheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logout, Moon, Sun, SunMoon } from 'tabler-icons-react';
import Logo from '../Logo';
import Menu from '../Menu';
import ThemeColoredIcon from '../ThemeColoredIcon';
import UserAccount from '../UserAccount';
import flags from './../../assets/flags.svg';
import { login } from './../../constants/routes';
import styles from './NavBar.module.scss';

interface Props {
  menuOpened: boolean;
  setMenuOpened: (value: boolean) => void;
}

const NavBar = ({ menuOpened, setMenuOpened }: Props) => {
  const [customColorScheme, setcustomColorScheme] = useState<
    'light' | 'dark' | 'system'
  >('system');
  const toggleCustomColorScheme = () => {
    switch (customColorScheme) {
      case 'light':
        setcustomColorScheme('dark');
        break;
      case 'dark':
        setcustomColorScheme('system');
        break;
      case 'system':
        setcustomColorScheme('light');
        break;
    }
  };
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  useEffect(() => {
    if (customColorScheme === 'system') {
      if (matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleColorScheme('dark');
      } else {
        toggleColorScheme('light');
      }
    } else {
      toggleColorScheme(customColorScheme);
    }
  }, [customColorScheme]);
  useEffect(() => {
    const darkQuery = matchMedia('(prefers-color-scheme: dark)');
    const lightQuery = matchMedia('(prefers-color-scheme: light)');
    const darkListener = (e: MediaQueryListEvent) => {
      if (e.matches && customColorScheme === 'system') {
        toggleColorScheme('dark');
      }
    };
    const lightListener = (e: MediaQueryListEvent) => {
      if (e.matches && customColorScheme === 'system') {
        toggleColorScheme('light');
      }
    };
    darkQuery.addEventListener('change', darkListener);
    lightQuery.addEventListener('change', lightListener);
    return () => {
      darkQuery.removeEventListener('change', darkListener);
      lightQuery.removeEventListener('change', lightListener);
    };
  }, [colorScheme, toggleColorScheme]);

  const renderSwitchThemeIcon = () => {
    switch (customColorScheme) {
      case 'light':
        return Moon;
      case 'dark':
        return SunMoon;
      case 'system':
        return Sun;
    }
  };

  return (
    <MNavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!menuOpened}
      styles={() => ({})}
      width={{
        sm: 250,
        md: 250,
        lg: 250,
        xl: 250,
      }}>
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <MNavbar.Section mt="md">
          <Logo />
        </MNavbar.Section>
      </MediaQuery>
      <MNavbar.Section grow component={ScrollArea} mx="-xs" mt="md">
        <Menu onClick={() => setMenuOpened(false)} />
      </MNavbar.Section>
      <MNavbar.Section mt="md">
        <UserAccount />
      </MNavbar.Section>
      <MNavbar.Section mt="md">
        <Group position="center" spacing="xl">
          <ActionIcon onClick={() => toggleCustomColorScheme()}>
            <ThemeColoredIcon component={renderSwitchThemeIcon()} />
          </ActionIcon>
          <ActionIcon
            component="img"
            src={flags}
            className={colorScheme === 'light' ? '' : styles.inverted}
            alt="Toggle language"
            onClick={() => toggleColorScheme()}
          />
        </Group>
      </MNavbar.Section>
      <MNavbar.Section mt="md">
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
      </MNavbar.Section>
    </MNavbar>
  );
};

export default NavBar;
