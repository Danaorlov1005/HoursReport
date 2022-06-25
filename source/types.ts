export interface EmployeeRecord {
    employeeName: string;
    startHour: string;
    endHour: string;
}

export interface TotalHoursReport {
    date: string;
    totalHours: number;
}

export const formatWithHours = "DD/MM/YYYY hh:mm:ss";
export const dateFormat = "DD/MM/YYYY";