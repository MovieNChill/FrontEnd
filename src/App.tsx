import { Route, Routes } from 'react-router-dom';
import routes from './constants/routes';

const App = () => {
  return (
    <Routes>
      <Route element={routes.base.component}>
        <Route path={routes.home.path} element={routes.home.component} />
        <Route path={routes.medias.path}>
          <Route index element={routes.medias.component} />
          <Route
            path={routes.mediaInfos.path}
            element={routes.mediaInfos.component}
          />
        </Route>
        <Route path={routes.library.path} element={routes.library.component} />
        <Route path={routes.forum.path} element={routes.forum.component} />
      </Route>
      <Route path={routes.login.path} element={routes.login.component} />
      <Route path={routes.register.path} element={routes.register.component} />
      {/* <Route element={routes.base.component}>
        <Route
          path={routes.notFound.path}
          element={routes.notFound.component}
        />
      </Route> */}
    </Routes>
  );
};

export default App;
