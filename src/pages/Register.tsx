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
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { InfoCircle } from 'tabler-icons-react';
import GoogleButton from '../components/GoogleButton';
import Logo from '../components/Logo';
import ThemeColoredIcon from '../components/ThemeColoredIcon';
import { home, login } from '../constants/routes';
import { CustomResponseUser } from '../entities/user';
import { useUserLocalStorage } from '../hooks/useUserLocalStorage';
import { register } from '../services/userService';

interface FormValues {
  pseudo: string;
  email: string;
  password: string;
  termsOfService: boolean;
}

const Register = () => {
  const [visiblePassword, { toggle }] = useDisclosure(false);
  let apiError: CustomResponseUser | undefined = undefined;
  const { user, setUser } = useUserLocalStorage();
  const navigate = useNavigate();

  if (user) {
    navigate(home.path);
  }

  const form = useForm<FormValues>({
    initialValues: {
      pseudo: '',
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => {
        if ((value! as string).length === 0) return 'Email must not be empty';
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/.test(value))
          return 'Email is not valid';
        if (apiError?.code === 'email_already_exists') return apiError.message;
      },
      pseudo: (value) => {
        if (apiError?.code === 'pseudo_already_exists') return apiError.message;
        if ((value! as string).length === 0) return 'Pseudo must not be empty';
      },
      password: (value) => {
        console.log(
          'validate ',
          apiError?.code,
          ' ?',
          apiError?.code == 'invalid_password',
          ' -> ',
          apiError?.message,
        );
        if (true) {
          console.log('test');
        }
        if (apiError?.code == 'invalid_password') {
          console.log(apiError.message);
          return apiError.message;
        }
        if ((value! as string).length === 0)
          return 'Password must not be empty';
      },
    },
  });

  const handleSubmit = async (values: FormValues) => {
    apiError = undefined;
    try {
      const res = await register({
        pseudo: values.pseudo,
        email: values.email,
        password: values.password,
      });
      setUser(res.object);
      console.log(res);
    } catch (err) {
      apiError = (err as { response: { data: CustomResponseUser } }).response
        .data;
      // form.validate();
    }
    console.log(form.validate());
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
            label={
              <span>
                Password{' '}
                <Tooltip
                  multiline
                  width={200}
                  label="The password must be at least 8 characters long and must contain at least one digit, one lower case, one upper case, and one special character">
                  <span>
                    <ThemeColoredIcon
                      component={InfoCircle}
                      size={15}
                      style={{ marginBottom: '-2px' }}
                    />
                  </span>
                </Tooltip>
              </span>
            }
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
