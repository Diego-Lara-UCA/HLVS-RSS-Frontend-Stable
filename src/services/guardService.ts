import apiClient from "@/api/axios/axiosInstance";
import { IGuard, IRegisterGuardRequest } from "@/interfaces/ManageGuard";

export const getAllGuards = async (): Promise<IGuard[]> => {
  try {
    const response = await apiClient.get<{ data: IGuard[] }>("/users/all-guards");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching guards:", error);
    throw error;
  }
};

export const registerGuard = async (guardData: IRegisterGuardRequest): Promise<void> => {
  try {
    await apiClient.post("/users/register-guard", guardData);
  } catch (error) {
    console.error("Error registering guard:", error);
    throw error;
  }
};
