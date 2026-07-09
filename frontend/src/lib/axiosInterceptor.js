import axios from "./axios";
import useUserStore from "../store/useUserStore";

let refreshPromise = null;

export const setupInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (originalRequest.url?.includes("/recreate-access-token")) {
          await useUserStore.getState().signout();
          return Promise.reject(error);
        }

        try {
          if (!refreshPromise) {
            refreshPromise = useUserStore.getState().refreshToken();
          }

          await refreshPromise;
          refreshPromise = null;

          return axios(originalRequest);
        } catch (refreshError) {
          refreshPromise = null;
          console.error("Token refresh failed:", refreshError);

          await useUserStore.getState().signout();

          window.location.href = "/sign-in";

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
