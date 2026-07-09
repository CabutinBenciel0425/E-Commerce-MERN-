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

      if (originalRequest.url?.includes("/recreate-access-token")) {
        await useUserStore.getState().signout();
        window.location.href = "/sign-in";
        return Promise.reject(error);
      }

      if (error.response?.status !== 401 || originalRequest._retry) {
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
        console.log("✅ Token refreshed successfully");

        await new Promise((resolve) => setTimeout(resolve, 200));

        refreshPromise = null;
        isRefreshing = false;

        return axios(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        isRefreshing = false;

        await useUserStore.getState().signout();
        window.location.href = "/sign-in";

        return Promise.reject(refreshError);
      }
    },
  );
};
