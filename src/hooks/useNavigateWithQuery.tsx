import { useMemo } from 'react';
import {
  createSearchParams,
  Link,
  LinkProps,
  Navigate,
  NavigateOptions,
  NavigateProps,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { medias } from '../constants/routes';
import { QueryParams } from '../entities/extends/queryParams';

export const useNavigateWithQuery = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const parameters: QueryParams = useMemo(() => {
    const q = searchParams.get('q') || undefined;
    const name = searchParams.get('name') || undefined;
    const director = searchParams.get('director') || undefined;
    const genres = searchParams.getAll('genres') || undefined;
    const description = searchParams.get('description') || undefined;
    const stars = searchParams.getAll('stars') || undefined;
    const writers = searchParams.getAll('writers') || undefined;
    return {
      ...(q ? { q } : {}),
      ...(name ? { name } : {}),
      ...(director ? { director } : {}),
      ...(genres ? { genres } : {}),
      ...(description ? { description } : {}),
      ...(stars ? { stars } : {}),
      ...(writers ? { writers } : {}),
    };
  }, [searchParams]);

  const searchQuery = useMemo(() => {
    let query = '';
    const params = { ...parameters };
    const q = params.q;
    if (q) {
      query += `${q},`;
    }
    delete params.q;

    Object.keys(params).forEach((key) => {
      const k = key as keyof QueryParams;
      const value = params[k];
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            query += `${key}:${v},`;
          });
        } else query += `${key}:${value},`;
      }
    });
    if (query.length === 0) return undefined;
    return query.substring(0, query.length - 1);
  }, [parameters]);

  const customNavigate = (
    path: string,
    params?: QueryParams,
    options?: NavigateOptions,
  ) => {
    navigate(
      `${path}${`?${createSearchParams(params ?? searchParams)}`}`,
      options,
    );
  };

  return {
    navigate: customNavigate,
    Link: ({ to, ...props }: LinkProps) => (
      <Link
        to={`${to}${parameters ? `?${createSearchParams(parameters)}` : ''}`}
        {...props}
      />
    ),
    Navigate: ({ to, ...props }: NavigateProps) => (
      <Navigate
        to={`${to}${parameters ? `?${createSearchParams(parameters)}` : ''}`}
        {...props}
      />
    ),
    searchQuery,
    searchParams: parameters,
    clearSearchParam: (param: keyof QueryParams) => {
      const newParameters = { ...parameters };
      delete newParameters[param];
      console.log(newParameters);
      customNavigate(medias.path, newParameters);
    },
  };
};
