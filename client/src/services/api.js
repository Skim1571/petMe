import axios from 'axios'
import { BASE_URL } from '../globals'

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

// Client.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;
//     const valid = TokenService.getRefreshTokenValidity();
//     // if refresh token is expired, redirect user to login with action
//     if (!valid) {
//       useDispatch(deleteUserData());
//     }

//     if (error.response.status === 401 && !originalRequest.retry) {
//       originalRequest.retry = true;
//       return requestService({
//         url: "/api/v1/accounts/token/refresh/",
//         method: "post",
//         data: {
//           refresh: TokenService.getRefreshToken(),
//         },
//       }).then((res) => {
//         if (res.status === 200) {
//           TokenService.setToken(res.data);

//           Client.defaults.headers.common.Authorization = `Bearer ${TokenService.getAccessToken()}`;

//           return requestService(originalRequest);
//         }
//         return null;
//       });
//     }
//     return Promise.reject(error);
//   },
// );