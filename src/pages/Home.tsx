import { Loader, Text } from '@mantine/core';
import { useAsync } from 'react-use';
import Recommendation from '../components/Recommendation';
import { useUserLocalStorage } from '../hooks/useUserLocalStorage';
import { getGenres } from '../services/mediaService';

const Home = () => {
  const { user } = useUserLocalStorage();

  const categories = useAsync(() => getGenres(), []);

  if (categories.loading || !categories.value) {
    return <Loader />;
  }
  if (!user || !categories.value) return <></>;
  return (
    <>
      <Text weight={500}>Recommended for you:</Text>
      {categories.value.map((category, i) => (
        <Recommendation key={i} category={category} userId={user.id ?? 0} />
      ))}
    </>
  );
};

export default Home;
