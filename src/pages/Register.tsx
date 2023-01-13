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
import { login } from '../constants/routes';
import { CustomResponseUser, User } from '../entities/user';
import { register } from '../services/userService';

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
      email: (value) => {
        if ((value! as string).length == 0) return 'Email must not be empty';
        if (/^\S+@\S+$/.test(value) == null) return 'Invalid email';
      },
      pseudo: (value) => {
        if ((value! as string).length == 0) return 'Pseudo must not be empty';
      },
      password: (value) => {
        if ((value! as string).length == 0) return 'Password must not be empty';
      },
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    await register(values as User)
      .then((res: CustomResponseUser) => {
        // navigate(login.path);
      })
      .catch((err) => {
        err = err.response.dat as CustomResponseUser;
        switch (err?.code) {
          case 'email_already_exists':
            form.setFieldError('email', err?.message);
            break;
          case 'pseudo_already_exists':
            form.setFieldError('pseudo', err?.message);
            break;
          case 'invalid_password':
            form.setFieldError('password', err?.message);
        }
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
