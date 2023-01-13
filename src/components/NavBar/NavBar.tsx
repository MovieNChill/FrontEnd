import {
  ActionIcon,
  Button,
  Group,
  MediaQuery,
  Navbar as MNavbar,
  ScrollArea,
  Text,
  Tooltip,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Logout, Moon, Sun, SunMoon } from 'tabler-icons-react';
import { login } from '../../constants/routes';
import { useColorSchemeLocalStorage } from '../../hooks/useColorSchemeLocalStorage';
import Logo from '../Logo';
import Menu from '../Menu';
import ThemeColoredIcon from '../ThemeColoredIcon';
import UserAccount from '../UserAccount';

interface Props {
  menuOpened: boolean;
  setMenuOpened: (value: boolean) => void;
}

const Navbar = ({ menuOpened, setMenuOpened }: Props) => {
  const { colorScheme, colorSchemeWithSystem, toggleColorScheme } =
    useColorSchemeLocalStorage();

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
          <Tooltip
            label={
              <>
                <Text align="center">Toggle visual mode</Text>
                <Text align="center">
                  Current : {colorSchemeWithSystem} mode
                </Text>
              </>
            }>
            <ActionIcon onClick={() => toggleColorScheme()}>
              <ThemeColoredIcon
                component={
                  colorSchemeWithSystem === 'system'
                    ? SunMoon
                    : colorSchemeWithSystem === 'light'
                    ? Moon
                    : Sun
                }
              />
            </ActionIcon>
          </Tooltip>
          {/* <ActionIcon
            component="img"
            src={flags}
            className={colorScheme === 'light' ? '' : styles.inverted}
            alt="Toggle language"
            onClick={() => toggleColorScheme()}
          /> */}
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
