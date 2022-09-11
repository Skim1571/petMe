import axios from 'axios'
import { BASE_URL } from '../globals'
import { checkToken, refreshToken, setToken } from './Auth'

export const Client = axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token_access')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

//  credit: used https://www.devoreur2code.com/setup-jwt-react-django-app as a resource

Client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('intercept response')
    const originalRequest = error.config;
    const valid = checkToken(localStorage.getItem('token_access'));
    // if refresh token is expired, redirect user to login with action
    if (valid.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      refreshToken(localStorage.getItem('token_refresh')
      ).then((res) => {
        if (res.status === 200) {
          setToken(res.data);
          Client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token_access')}`;
          return Client(originalRequest);
        }
        return null;
      });
    }
    return Promise.reject(error);
  },
);