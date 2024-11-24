import apiClient from "@/api/axios/axiosInstance";
import { IGoogleLoginResponse, IApiAuthResponse } from "@/interfaces/Auth";
import { redirectUser } from "@/utils/navigationUtils";
import {
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/storageUtils";

export const sendAuth = async (
  token: IGoogleLoginResponse["access_token"]
): Promise<void> => {
  try {
    const response = await apiClient.post<IApiAuthResponse>(
      `/auth/login/${token}`,
      { token }
    );

    const { status, data } = response;

    if (data && data.data.token) {
      const { token: JWToken } = data.data;
      saveToLocalStorage("token", JWToken);

      if (status === 200) {
        redirectUser("/profile");
      } else if (status === 202) {
        redirectUser("/dashboard");
      }
    } else {
      throw new Error("Token is missing in the response data");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    throw new Error("Error during authentication");
  }
};

export const logout = async (email: string): Promise<void> => {
  try {
    await apiClient.post(`/auth/logout/${email}`);
    removeFromLocalStorage("token");
    removeFromLocalStorage("email");
    redirectUser("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};