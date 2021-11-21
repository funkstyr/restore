import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// using weird bypass that could be done by webpack-dev-server or api config
// visit https://cors-anywhere.herokuapp.com/corsdemo to get access
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// const api = axios.create({
//   baseURL: 'https://staging.websoftdev.com/ndwrmetersapi/',
//   timeout: 10000,
// });

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { data, status } = error.response!;

    switch (status) {
      case 400:
      case 401:
      case 500:
        toast.error(data.title);
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => api.get(url).then(responseBody),
  post: (url: string, body: {}) => api.post(url, body).then(responseBody),
  put: (url: string, body: {}) => api.put(url, body).then(responseBody),
  delete: (url: string) => api.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorized'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationsError: () => requests.get('buggy/validation-error'),
};

export const agent = {
  Catalog,
  TestErrors,
};

export default api;
