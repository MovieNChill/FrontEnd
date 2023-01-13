import {
  Box,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { UserCircle } from 'tabler-icons-react';
import { User } from '../entities/user';

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
      <UnstyledButton
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
        }}>
        <Group>
          <UserCircle size={40} strokeWidth={1.5} color={'black'}></UserCircle>
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.pseudo}
            </Text>
            <Text color="dimmed" size="xs">
              {user.email}
            </Text>
          </Box>

          {theme.dir === 'ltr' ? (
            <IconChevronRight size={18} />
          ) : (
            <IconChevronLeft size={18} />
          )}
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default UserAccount;
