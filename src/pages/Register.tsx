import {
  Anchor,
  AppShell,
  Box,
  Button,
  Checkbox,
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
import { home, login } from '../constants/routes';

interface FormValues {
  pseudo: string;
  email: string;
  password: string;
  termsOfService: boolean;
}

const Register = () => {
  const [visiblePassword, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    initialValues: {
      pseudo: '',
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      pseudo: (value) =>
        (value! as string).length > 0 ? null : 'Pseudo must not be empty',
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
          Create an account
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mt="md"
            withAsterisk
            label="Pseudo"
            {...form.getInputProps('pseudo')}
          />
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

          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Button mt="md" fullWidth type="submit" radius="md">
            Register
          </Button>
        </form>
        <Divider my="xl" label="or" labelPosition="center" />
        <GoogleButton />
        <Group position="center" mt="lg">
          <Text size="xs" align="center" c="dimmed">
            Already have an account ?
          </Text>

          <Anchor size="xs" ml="sm" component={Link} to={login.path}>
            Log In
          </Anchor>
        </Group>
      </Box>
    </AppShell>
  );
};

export default Register;
