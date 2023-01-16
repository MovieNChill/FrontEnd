import { Loader } from '@mantine/core';
import { useAsync } from 'react-use';
import { mediaUpcomingFilterHelper } from '../helpers/mediaFilterHelper';
import { getMediaWithFilter } from '../services/mediaService';
import MediasRow from './MediasRow';

const MediasRows = () => {
  const medias = useAsync(() =>
    getMediaWithFilter({
      search: mediaUpcomingFilterHelper(),
    }),
  );

  if (medias.loading || !medias.value) {
    return <Loader />;
  }

  return (
    <>
      <MediasRow title="Upcoming" medias={medias.value} />
      <MediasRow title="Recommended" medias={medias.value} />
      {/* <MediasRow
        title={`Popular movies on ${getCurrentMonth()}`}
        medias={medias.value}
      /> */}
    </>
  );
};

export default MediasRows;
