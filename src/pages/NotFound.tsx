import { Box, Text, Title } from '@mantine/core';
import { Navigate, useLocation } from 'react-router-dom';
import { base, home } from '../constants/routes';

export const NotFound = () => {
  const { pathname } = useLocation();

  if (pathname === base.path) return <Navigate to={home.path} />;

  return (
    <Box mx="auto">
      <Title align="center">Congratulations!</Title>
      <Text align="center">You've found our beloved</Text>
      <Text
        variant="gradient"
        gradient={{ from: '#36D1DC', to: '#5B86E5', deg: 135 }}
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        fw={700}
        align="center"
        size={200}
        lh={1}>
        404
      </Text>
      <Text
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        fw={700}
        align="center"
        size={100}
        lh={1}>
        PAGE
      </Text>
      <Text c="dimmed" align="center">
        Nothing to do here tho...
      </Text>
    </Box>
  );
};
