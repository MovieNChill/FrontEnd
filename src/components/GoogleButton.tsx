import { Button, Text } from '@mantine/core';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { BrandGoogle } from 'tabler-icons-react';
import { home } from '../constants/routes';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';
import { useUserLocalStorage } from '../hooks/useUserLocalStorage';
import { googleAuth } from '../services/userService';

const GoogleButton = () => {
  const isRegister = location.pathname === '/register';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { setUser } = useUserLocalStorage();
  const { navigate } = useNavigateWithQuery();

  const sendGoogleToken = async (token: string) => {
    const res = await googleAuth({ token });
    if (res.code || !res.object) {
      setError(res.message);
      return;
    }
    setUser(res.object);
    setLoading(false);
    navigate(home.path);
  };

  const handleSuccess = async (
    tokenResponse: Omit<
      TokenResponse,
      'error' | 'error_description' | 'error_uri'
    >,
  ) => {
    if (
      tokenResponse.scope.includes('email') &&
      tokenResponse.scope.includes('profile')
    ) {
      setError(undefined);
      await sendGoogleToken(tokenResponse.access_token);
    } else {
      setError('You must allow access to your email and profile');
      setLoading(false);
    }
  };

  const handleError = (
    error: Pick<TokenResponse, 'error' | 'error_description' | 'error_uri'>,
  ) => {
    setError(error.error_description);
    setLoading(false);
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
