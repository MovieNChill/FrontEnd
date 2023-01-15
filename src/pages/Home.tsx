import MediasRow from '../components/MediasRow';
import { MediaDTO } from '../entities/media';
import { useUserLocalStorage } from '../hooks/useUserLocalStorage';
import media1 from './../assets/media1.svg';
import media2 from './../assets/media2.svg';
import media3 from './../assets/media3.svg';
import media4 from './../assets/media4.svg';

const medias: MediaDTO[] = [
  { id: 0, imgUrl: media1, name: 'bengz' },
  { id: 1, imgUrl: media2, name: 'bengz' },
  { id: 2, imgUrl: media3, name: 'bengz' },
  { id: 3, imgUrl: media4, name: 'bengz' },
];

const Home = () => {
  const { user } = useUserLocalStorage();
  if (!user) return <></>;
  return <MediasRow medias={medias} title="Recommended for you" />;
};

export default Home;
