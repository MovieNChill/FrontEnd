import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './constants/routes';
import Home from './pages/Home';
import Login from './pages/Login';
import MediaInfos from './pages/MediaInfos';
import Medias from './pages/Medias';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

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
