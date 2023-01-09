import { Button } from '@mantine/core';
import { BrandGoogle } from 'tabler-icons-react';

export const GoogleButton = () => {
  const isRegister = location.pathname === '/register';
  return (
    <Button
      fullWidth
      leftIcon={<BrandGoogle />}
      radius="md"
      variant="outline"
      color="gray">
      {isRegister ? 'Sign up with Google' : 'Log in with Google'}
    </Button>
  );
};
