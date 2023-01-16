import Axios, { AxiosRequestConfig } from 'axios';

const getInstance = (endPoint: string) => {
  return Axios.create({
    baseURL: `https://movienchill-api-gateway.azuremicroservices.io/${endPoint}`,
  });
};

export const mediasApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await getInstance('MEDIAS')(config);
  return data;
};

export const usersApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await getInstance('USERS')(config);
  return data;
};
