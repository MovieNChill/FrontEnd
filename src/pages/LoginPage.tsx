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
import { CustomResponseUser, LoginDTO, User } from '../entities/user';
import { useUserLocalStorage } from '../hooks/useUserLocalStorage';
import { login } from '../services/userService';

interface FormValues {
  login: string;
  password: string;
}

const LoginPage = () => {
  const [visiblePassword, { toggle }] = useDisclosure(false);
  let apiError: CustomResponseUser | null = null;
  const { user, setUser } = useUserLocalStorage();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    initialValues: {
      login: '',
      password: '',
    },

    validate: {
      login: (value) => {
        console.log(apiError);
        if (apiError?.code === 'user_not_found') return apiError.message;
        if ((value! as string).length === 0) return 'Login must not be empty';
      },
      password: (value) => {
        if (apiError?.code === 'incorrect_password') return apiError.message;
        if ((value! as string).length === 0)
          return 'Password must not be empty';
      },
    },
  });

  const handleSubmit = async (values: FormValues) => {
    apiError = null;
    await login(values as LoginDTO)
      .then((res: CustomResponseUser) => {
        setUser(res.object as User);
        navigate(home.path);
      })
      .catch((err) => {
        err = err.response.data as CustomResponseUser;
        apiError = err;
        form.validate();
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
