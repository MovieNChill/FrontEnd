import { useLocalStorage } from '@mantine/hooks';
import { User } from '../entities/user';

export const useUserLocalStorage = () => {
  const [user, setUser] = useLocalStorage<User>({
    key: 'user',
    defaultValue: undefined,
    getInitialValueInEffect: true,
    serialize: (value) => JSON.stringify(value),
    deserialize: (value) => JSON.parse(value),
  });

  return {
    user,
    setUser,
  };
};
