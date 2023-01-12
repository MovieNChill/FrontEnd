import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

let instance: AxiosInstance;

export const getInstance = () => {
  if (instance) return instance;

  instance = Axios.create({
    baseURL: 'https://api-movienchill-userservice.azuremicroservices.io',
  });
  return instance;
};

export const userApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await getInstance()(config);
  return data;
};

export default userApi;
