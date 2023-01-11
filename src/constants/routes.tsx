import {
  Home as HomeIcon,
  Messages,
  PlaylistAdd,
  Video,
} from 'tabler-icons-react';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MediaInfos from '../pages/MediaInfos';
import Medias from '../pages/Medias';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';

export const base = {
  path: '/',
  component: <Layout />,
};
export const home = {
  path: '/home',
  icon: HomeIcon,
  component: <Home />,
  label: 'Home',
};
export const medias = {
  path: '/medias',
  icon: Video,
  component: <Medias />,
  label: "Movies N' TV Shows",
};
export const mediaInfos = {
  path: '/medias/:id',
  component: <MediaInfos />,
  getPath: (id: number) => `/medias/${id}`,
};
export const library = {
  path: '/library',
  icon: PlaylistAdd,
  component: <div>Library</div>,
  label: 'Library',
};
export const forum = {
  path: '/forum',
  icon: Messages,
  component: <div>Forum</div>,
  label: 'Forum',
};
export const login = {
  path: '/login',
  component: <Login />,
};
export const register = {
  path: '/register',
  component: <Register />,
};
export const notFound = {
  path: '*',
  component: <NotFound />,
};

export default {
  base,
  home,
  medias,
  mediaInfos,
  library,
  forum,
  login,
  register,
  notFound,
};
