import axios, { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  let subscribers = [] as any;
  let isRefreshing = false;
  function subscribeTokenRefresh(cb: any) {
    subscribers.push(cb);
  }
  function onRefreshed(authToken: any) {
    subscribers.map((cb: any) => cb(authToken));
  }

  useEffect(() => {
    const user =
      typeof Storage === "undefined"
        ? {}
        : JSON.parse(localStorage.getItem("user") || "{}");

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${user?.tokens.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?._retry) {
          if (!isRefreshing) {
            prevRequest._retry = true;
            isRefreshing = true;

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${user?.tokens.refreshToken}`;
            const response = await axios.get("/auth/refresh");
            localStorage.setItem("user", JSON.stringify(response?.data));
            const newAccessToken = response.data.tokens.accessToken
            onRefreshed(newAccessToken);
            subscribers = [];
            isRefreshing = false;
          }
          return new Promise((resolve: any) => {
            subscribeTokenRefresh((token: any) => {
              prevRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(axiosPrivate(prevRequest));
            });
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};
export default useAxiosPrivate;
