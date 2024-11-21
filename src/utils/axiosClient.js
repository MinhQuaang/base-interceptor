import axios from "axios";
import { toast } from "react-toastify";
import { refreshTokenRequest } from "../requests/authRequests";

let axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

// The maximum waiting time for a request is 10 minutes
axiosClient.defaults.timeout = 1000 * 60 * 10;

// axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    const access_token = localStorage.getItem("accessToken");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const originalConfig = error.config;
    console.log(originalConfig);

    if (error?.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        return refreshTokenRequest(refreshToken)
          .then((response) => {
            const { access_token: accessToken, refresh_token: refreshToken } =
              response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            axiosClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
            return axiosClient(originalConfig);
          })
          .catch((error) => {});
      }
    }
    toast.error(error?.response?.data?.message || error?.message);

    return Promise.reject(error);
  }
);
export default axiosClient;
