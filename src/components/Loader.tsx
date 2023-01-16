import { Center, Loader as MLoader } from '@mantine/core';

const Loader = () => {
  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <MLoader />
    </Center>
  );
};

export default Loader;
