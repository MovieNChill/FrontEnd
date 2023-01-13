import {
  Anchor,
  AppShell,
  Box,
  Button,
  Divider,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import Logo from '../components/Logo';
import { home, register } from '../constants/routes';
import { Login } from '../entities/user';
import { login } from '../services/userService';

interface FormValues {
  login: string;
  password: string;
}

const LoginPage = () => {
  const [visiblePassword, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    initialValues: {
      login: '',
      password: '',
    },

    validate: {
      // login: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid login'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    await login(values as Login)
      .then((response) => {
        console.log('response', response);
        navigate(home.path);
      })
      .catch((error) => {
        console.log('error', error);
      });
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
            label="Login"
            placeholder="email or pseudo"
            {...form.getInputProps('login')}
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
          <Anchor size="xs" ml="sm" component={Link} to={register.path}>
            Sign Up
          </Anchor>
        </Group>
      </Box>
    </AppShell>
  );
};

export default LoginPage;
