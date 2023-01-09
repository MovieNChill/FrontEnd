import { Skeleton } from '@mantine/core';
import { mediaInfos } from '../constants/routes';
import { MediaLightDto } from '../entities/mediaDtos';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';

interface Props {
  media?: MediaLightDto;
}

export const MediaPoster = ({ media }: Props) => {
  const { navigate } = useNavigateWithQuery();
  return (
    <Skeleton visible={!media} width={200} height={315}>
      {media && (
        <img
          onClick={() => navigate(mediaInfos.getPath(media.id))}
          style={{ cursor: 'pointer' }}
          src={media.imgSrc}
          alt="media"
          width={200}
          height={315}
        />
      )}
    </Skeleton>
  );
};
