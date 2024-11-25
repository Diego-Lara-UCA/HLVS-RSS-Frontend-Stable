import apiClient from "@/api/axios/axiosInstance";
import {
  ICreatePermissionRequest,
  IPermissionDetailsRequest,
} from "@/interfaces/Permissions";

export const createPermission = async (
  data: ICreatePermissionRequest
): Promise<void> => {
  try {
    await apiClient.post("/residential/permission/create", data);
  } catch (error) {
    console.error("Error creating permission:", error);
    throw error;
  }
};

export const getPermissionsDetails = async (
  email: string
): Promise<IPermissionDetailsRequest[]> => {
  try {
    const response = await apiClient.get<{ data: IPermissionDetailsRequest[] }>(
      `/residential/permission/permission-details/${email}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching permission details:", error);
    throw error;
  }
};
