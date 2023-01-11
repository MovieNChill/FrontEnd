import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

let instance: AxiosInstance;

export const getInstance = () => {
  if (instance) return instance;

  instance = Axios.create({
    baseURL: 'https://api-movienchill-mediaservice.azuremicroservices.io',
  });
  return instance;
};

export const mediaApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await getInstance()(config);
  return data;
};

export default mediaApi;
