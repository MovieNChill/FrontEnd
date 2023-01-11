import {
  Home as HomeIcon,
  Messages,
  PlaylistAdd,
  Video,
} from 'tabler-icons-react';

export const base = {
  path: '/',
};
export const home = {
  path: '/home',
  icon: HomeIcon,
  label: 'Home',
};
export const medias = {
  path: '/medias',
  icon: Video,
  label: "Movies N' TV Shows",
};
export const mediaInfos = {
  path: '/medias/:id',
  getPath: (id?: number) => `/medias/${id}`,
};
export const library = {
  path: '/library',
  icon: PlaylistAdd,
  label: 'Library',
};
export const forum = {
  path: '/forum',
  icon: Messages,
  label: 'Forum',
};
export const login = {
  path: '/login',
};
export const register = {
  path: '/register',
};
export const notFound = {
  path: '*',
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
