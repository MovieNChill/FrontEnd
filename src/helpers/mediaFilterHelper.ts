export const convertQueryParamToMediaFilter = (q: string) => {
  return `?search=name=${q}`;
};
