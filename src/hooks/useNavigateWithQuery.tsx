import { useMemo } from 'react';
import {
  createSearchParams,
  Link,
  LinkProps,
  NavigateOptions,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const searchParamsKeys = ['q', 'mood'] as const;
type KeyType = (typeof searchParamsKeys)[number];
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export const useNavigateWithQuery = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const parameters = useMemo(() => {
    const params: PartialRecord<KeyType, string> = {};
    searchParamsKeys.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        params[param] = value;
      }
    });
    return params;
  }, [searchParams]);

  return {
    navigate: (
      path: string,
      params?: PartialRecord<KeyType, string>,
      options?: NavigateOptions,
    ) => {
      const newParameters = { ...parameters, ...params };

      navigate(
        `${path}${
          newParameters ? `?${createSearchParams(newParameters)}` : ''
        }`,
        options,
      );
    },
    Link: ({ to, ...props }: LinkProps) => (
      <Link
        to={`${to}${parameters ? `?${createSearchParams(parameters)}` : ''}`}
        {...props}
      />
    ),
    searchParams: parameters,
    clearSearchParam: (param: KeyType) => {
      const newParameters = { ...parameters };
      delete newParameters[param];
      setSearchParams(newParameters);
    },
  };
};
