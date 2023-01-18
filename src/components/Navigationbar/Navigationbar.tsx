import {
  ActionIcon,
  Button,
  Group,
  MediaQuery,
  Navbar as MNavbar,
  ScrollArea,
  Space,
  Text,
  Tooltip,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  Login,
  Logout,
  Moon,
  Sun,
  SunMoon,
  UserPlus,
} from 'tabler-icons-react';
import { home, login, register } from '../../constants/routes';
import { useColorSchemeLocalStorage } from '../../hooks/useColorSchemeLocalStorage';
import { useUserLocalStorage } from '../../hooks/useUserLocalStorage';
import Logo from '../Logo';
import Menu from '../Menu';
import ThemeColoredIcon from '../ThemeColoredIcon';
import UserAccount from '../UserAccount';

interface Props {
  menuOpened: boolean;
  setMenuOpened: (value: boolean) => void;
}

const Navigationbar = ({ menuOpened, setMenuOpened }: Props) => {
  const { colorScheme, colorSchemeWithSystem, toggleColorScheme } =
    useColorSchemeLocalStorage();

  const { user, setUser } = useUserLocalStorage();

  return (
    <MNavbar
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
        <MNavbar.Section mt="md">
          <Logo />
        </MNavbar.Section>
      </MediaQuery>
      <MNavbar.Section grow component={ScrollArea} mx="-xs" mt="md">
        <Menu onClick={() => setMenuOpened(false)} />
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
                    ? Sun
                    : colorSchemeWithSystem === 'light'
                    ? Moon
                    : SunMoon
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
        {user && (
          <MNavbar.Section mt="md">
            <UserAccount user={user} />
          </MNavbar.Section>
        )}
      </MNavbar.Section>
      <MNavbar.Section mt="md">
        {user ? (
          <Button
            variant="subtle"
            color="dark"
            fullWidth
            onClick={() => setUser(undefined)}
            component={Link}
            to={home.path}
            leftIcon={<ThemeColoredIcon component={Logout} />}
            styles={(theme) => ({
              root: {
                color: colorScheme === 'light' ? theme.black : theme.white,
              },
            })}>
            Log out
          </Button>
        ) : (
          <>
            <Button
              variant="subtle"
              color="dark"
              fullWidth
              component={Link}
              to={login.path}
              leftIcon={<ThemeColoredIcon component={Login} />}
              styles={(theme) => ({
                root: {
                  color: colorScheme === 'light' ? theme.black : theme.white,
                },
              })}>
              Log in
            </Button>
            <Space h="md" />
            <Button
              variant="subtle"
              color="dark"
              fullWidth
              component={Link}
              to={register.path}
              leftIcon={<ThemeColoredIcon component={UserPlus} />}
              styles={(theme) => ({
                root: {
                  color: colorScheme === 'light' ? theme.black : theme.white,
                },
              })}>
              Register
            </Button>
          </>
        )}
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <div style={{ height: '30px' }}></div>
        </MediaQuery>
      </MNavbar.Section>
    </MNavbar>
  );
};

export default Navigationbar;
