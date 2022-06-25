import { dateFormat, TotalHoursReport } from '../types';
import moment from 'moment';

class ReportsDB {
    private EmployeesHours: {[key: string]: TotalHoursReport[];} = {};
    insertReport = (employeeName: string, totalHoursReport: TotalHoursReport) => {
        if(!this.EmployeesHours[employeeName])
        {
            this.EmployeesHours[employeeName] = []
        }
        this.EmployeesHours[employeeName].push(totalHoursReport);
        return totalHoursReport;
    }
    
    getMonthlyEmployeeReportByDay = (employeeName: string, month: number) => {
        return this.EmployeesHours[employeeName].filter(report => {
           return(moment(report.date, dateFormat).month() === month - 1);
        });

    }

    getMonthlyHoursSum = (employeeName: string, month: number) => {
        return this.EmployeesHours[employeeName].reduce((prevValue, report) => {
            if((moment(report.date, dateFormat).month() === month - 1)){
                return prevValue + report.totalHours;
            }
            return prevValue;
         }, 0);
    }
}

 export = new ReportsDB();