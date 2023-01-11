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
import { Logout, Moon, Sun } from 'tabler-icons-react';
import { login } from '../../constants/routes';
import Logo from '../Logo';
import Menu from '../Menu';
import ThemeColoredIcon from '../ThemeColoredIcon';
import UserAccount from '../UserAccount';
import flags from './../../assets/flags.svg';
import styles from './NavBar.module.scss';

interface Props {
  menuOpened: boolean;
  setMenuOpened: (value: boolean) => void;
}

const Navbar = ({ menuOpened, setMenuOpened }: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
          <ActionIcon onClick={() => toggleColorScheme()}>
            <ThemeColoredIcon component={colorScheme === 'dark' ? Sun : Moon} />
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

export default Navbar;
