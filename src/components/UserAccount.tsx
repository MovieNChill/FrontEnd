import { Avatar, Box, Col, Grid, Text, useMantineTheme } from '@mantine/core';
import { UserCircle } from 'tabler-icons-react';
import { User } from '../entities/user';
import ThemeColoredIcon from './ThemeColoredIcon';

interface Props {
  user: User;
}

const UserAccount = ({ user }: Props) => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}>
      {/* <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}> */}
      <Grid gutter={40}>
        <Col span={2}>
          {user.picture ? (
            <Avatar src={user.picture} radius="xl" alt="user picture" />
          ) : (
            <ThemeColoredIcon
              component={UserCircle}
              size={40}
              strokeWidth={1.5}
              color={'black'}
            />
          )}
        </Col>
        <Col span={10}>
          <Text size="sm" weight={500} truncate>
            {user.pseudo}
          </Text>
          <Text color="dimmed" size="xs" truncate>
            {user.email}
          </Text>
        </Col>

        {/* {theme.dir === 'ltr' ? (
            <IconChevronRight size={18} />
          ) : (
            <IconChevronLeft size={18} />
          )} */}
      </Grid>
      {/* </UnstyledButton> */}
    </Box>
  );
};

export default UserAccount;
