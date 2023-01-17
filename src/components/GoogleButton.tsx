import { Button, Text } from '@mantine/core';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { BrandGoogle } from 'tabler-icons-react';

const GoogleButton = () => {
  const isRegister = location.pathname === '/register';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSuccess = (
    tokenResponse: Omit<
      TokenResponse,
      'error' | 'error_description' | 'error_uri'
    >,
  ) => {
    setLoading(false);
    console.log(tokenResponse.access_token);
    if (
      tokenResponse.scope.includes('email') &&
      tokenResponse.scope.includes('profile')
    ) {
    } else {
      setError('You must allow access to your email and profile');
    }
    console.log(tokenResponse);
  };

  const handleError = (
    error: Pick<TokenResponse, 'error' | 'error_description' | 'error_uri'>,
  ) => {
    setLoading(false);
    console.log(error);
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleClick = () => {
    setLoading(true);
    login();
  };
  return (
    <>
      <Button
        fullWidth
        onClick={handleClick}
        loading={loading}
        leftIcon={<BrandGoogle />}
        radius="md"
        variant="outline"
        color="gray">
        {isRegister ? 'Sign up with Google' : 'Log in with Google'}
      </Button>
      <Text color="red">{error}</Text>
    </>
  );
};

export default GoogleButton;
