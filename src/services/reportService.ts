import apiClient from "@/api/axios/axiosInstance";
import { IReport } from "@/interfaces/Report";

export const createReport = async (report: IReport): Promise<void> => {
    try {
        const response = await apiClient.post("/api/report/create", report);
        return response.data;
    } catch (error) {
        console.error("Error creating report:", error);
        throw error;
    }
};

export const getReports = async (): Promise<IReport[]> => { 
    try {
        const response = await apiClient.get("/api/report/all");
        return response.data;
    } catch (error) {
        console.error("Error getting reports:", error);
        throw error;
    }
};

export const getReportById = async (id: string): Promise<IReport> => {
    try {
        const response = await apiClient.get(`/api/report/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting report by id:", error);
        throw error;
    }
};