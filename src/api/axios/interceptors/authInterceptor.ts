import { getFromLocalStorage } from "@/utils/storageUtils";
import { InternalAxiosRequestConfig } from "axios";

export const authInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getFromLocalStorage("token");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
};
