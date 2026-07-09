import axios from "./axios";
import useUserStore from "../store/useUserStore";

let refreshPromise = null;
let isRefreshing = false;

export const setupInterceptors = () => {
  axios.interceptors.response.clear();

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if (originalRequest?.url?.includes("/recreate-access-token")) {
        const errorCodes = error.response?.data?.errors;
        const neverHadASession = errorCodes?.includes("NO_REFRESH_TOKEN");

        if (neverHadASession) {
          return Promise.reject(error);
        }

        if (status === 401 || status === 403) {
          await useUserStore.getState().signout();
          window.location.href = "/sign-in";
        } else {
          console.log(
            "🟡 Refresh request failed transiently, not signing out:",
            error.message,
          );
        }
        return Promise.reject(error);
      }

      if (status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (isRefreshing) {
          await refreshPromise;
          return axios(originalRequest);
        }

        isRefreshing = true;
        refreshPromise = useUserStore.getState().refreshToken();

        await refreshPromise;

        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        refreshPromise = null;
        isRefreshing = false;
      }
    },
  );
};
