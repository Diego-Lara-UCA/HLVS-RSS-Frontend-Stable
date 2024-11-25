export type ReportType = "SUSPICIOUS_ACTIVITY" | "PROPERTY_DAMAGE" | "EXCESSIVE_NOISE";

export interface IReport {
    id: string;
    description: string;
    type: ReportType;
    createdAt: string;
    user: {
        id: string;
        name: string;
    }
}