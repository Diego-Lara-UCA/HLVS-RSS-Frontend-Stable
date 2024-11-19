import apiClient from "@/api/axios/axiosInstance";
import { IGoogleLoginResponse, IApiAuthResponse } from "@/interfaces/Auth";
import { redirectUser } from "@/utils/navigationUtils";
import { removeFromLocalStorage, saveToLocalStorage } from "@/utils/storageUtils";


export const sendAuth = async (
  token: IGoogleLoginResponse["access_token"]
): Promise<void> => {
  try {
    const response = await apiClient.post<IApiAuthResponse>(
      `/auth/login/${token}`,
      { token }
    );

    const { status, data } = response;
    const parsedData = typeof data.data === "string" ? JSON.parse(data.data) : data.data;

    if (parsedData) {
      const { email, token: JWToken } = parsedData;

      if (status === 200 && email) {
        saveToLocalStorage("email", email);
        redirectUser("/profile");
      } else if (status === 202 && JWToken) {
        saveToLocalStorage("token", JWToken);
        redirectUser("/dashboard");
      }
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
    redirectUser("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
