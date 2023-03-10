import { useLocalStorage } from '@mantine/hooks';
import { User } from '../entities/user';

export const useUserLocalStorage = () => {
  const [user, setUser] = useLocalStorage<User | undefined>({
    key: 'user',
    defaultValue: undefined,
    getInitialValueInEffect: true,
    serialize: (value) => (value ? JSON.stringify(value) : ''),
    deserialize: (value) => (value ? JSON.parse(value) : ''),
  });

  return {
    user,
    setUser,
  };
};
