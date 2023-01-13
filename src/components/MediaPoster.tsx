import { Skeleton } from '@mantine/core';
import { mediaInfos } from '../constants/routes';
import { MediaDTO } from '../entities/media';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';

interface Props {
  media?: MediaDTO;
  isLink?: boolean;
}

const MediaPoster = ({ media, isLink = true }: Props) => {
  const { navigate } = useNavigateWithQuery();
  return (
    <Skeleton visible={!media} width={200} height={315}>
      {media && (
        <img
          onClick={() => isLink && navigate(mediaInfos.getPath(media.id))}
          style={isLink ? { cursor: 'pointer' } : undefined}
          src={
            media.imgUrl ??
            'https://m.media-amazon.com/images/I/812KlOw6iYL._AC_SL1500_.jpg'
          }
          alt="media"
          width={200}
          height={315}
        />
      )}
    </Skeleton>
  );
};

export default MediaPoster;
