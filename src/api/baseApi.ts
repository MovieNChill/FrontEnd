import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class BaseApi {
  instance!: AxiosInstance;

  constructor(baseURL?: string) {
    this.instance = Axios.create({
      baseURL: baseURL,
    });
  }

  // apiCall = async <T>(config: AxiosRequestConfig): Promise<T> => {
  //   const { data } = await this.instance(config);
  //   return data;
  // };
}

// export const createApi = (baseUrl: string) => new BaseApi(baseUrl).apiCall;
// export const mediaApi = createApi(
//   'https://api-movienchill-mediaservice.azuremicroservices.io',
// );
// export const userApi = createApi(
//   'https://api-movienchill-userservice.azuremicroservices.io',
// );

export const mediaApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await new BaseApi(
    'https://api-movienchill-mediaservice.azuremicroservices.io',
  ).instance(config);
  return data;
};

export const userApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await new BaseApi(
    'https://api-movienchill-userservice.azuremicroservices.io',
  ).instance(config);
  return data;
};
