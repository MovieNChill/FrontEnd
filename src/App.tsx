import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './constants/routes';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
const Medias = lazy(() => import('./pages/Medias'));
const MediaInfos = lazy(() => import('./pages/MediaInfos'));

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={routes.home.path} element={<Home />} />
        <Route path={routes.medias.path}>
          <Route index element={<Medias />} />
          <Route path={routes.mediaInfos.path} element={<MediaInfos />} />
        </Route>
        <Route path={routes.library.path} element={<div>Library</div>} />
        <Route path={routes.forum.path} element={<div>Forum</div>} />
      </Route>
      <Route path={routes.login.path} element={<Login />} />
      <Route path={routes.register.path} element={<Register />} />
      <Route element={<Layout />}>
        <Route path={routes.notFound.path} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
