import {
  AppShell,
  Box,
  Button,
  Divider,
  Group,
  PasswordInput,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleButton } from '../components/GoogleButton';
import { Logo } from '../components/Logo';
import { home, register } from '../constants/routes';

interface FormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const [visiblePassword, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    navigate(home.path);
  };

  return (
    <AppShell
      padding="lg"
      header={
        <Box p="lg">
          <Logo />
        </Box>
      }>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Text size="xl" weight="bold" align="center">
          Welcome back
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mt="md"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            mt="md"
            withAsterisk
            label="Password"
            visible={visiblePassword}
            onVisibilityChange={toggle}
            {...form.getInputProps('password')}
          />

          <Button mt="xl" fullWidth type="submit" radius="md">
            Log in
          </Button>
        </form>
        <Divider my="xl" label="or" labelPosition="center" />
        <GoogleButton />
        <Group position="center" mt="lg">
          <Text size="xs" align="center" c="dimmed">
            Don't have an account ?
          </Text>

          <UnstyledButton ml="sm" component={Link} to={register.path}>
            <Text size="xs">Sign Up</Text>
          </UnstyledButton>
        </Group>
      </Box>
    </AppShell>
  );
};
