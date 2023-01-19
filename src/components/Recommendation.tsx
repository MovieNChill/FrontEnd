import { Group, Text } from '@mantine/core';
import { useAsync } from 'react-use';
import { getRecommendation } from '../services/mediaService';

interface Props {
  category: string;
  userId: number;
}

const Recommendation = ({ category, userId }: Props) => {
  const recommendedTitle = useAsync(() =>
    getRecommendation({ desired_genre: category, user_id: userId ?? 0 }),
  );
  if (recommendedTitle.loading || !recommendedTitle.value) return <></>;

  return (
    <>
      <Group spacing="md">
        <Text weight={500}>{`${category}:`}</Text>
        <Text>{recommendedTitle.value}</Text>
      </Group>
    </>
  );
};

export default Recommendation;
