/** Here is where in the real world there would be a connection to a real DB to save the hours 
 * best use would probably be Elasticsearch in this case
 * Assuming here hours need to be added to the start date as the work day and also
 * probably (for the logic) not surpassing the 24H per work day - with no duplicate records
 * also of course wrapped in all the async and try-catch protection needed
*/
import moment from 'moment';
import DB from '../DB/reports';
import { EmployeeRecord, formatWithHours, dateFormat } from '../types';

class ReportsService {
    addReportToDb = (employeeRecord: EmployeeRecord) => {
        let start = moment(employeeRecord.startHour, formatWithHours);
        let end = moment(employeeRecord.endHour, formatWithHours);
        let totalHours = end.diff(start, "hours");
        let date = moment(employeeRecord.startHour, dateFormat).format(dateFormat);
        return DB.insertReport(employeeRecord.employeeName, {date: date, totalHours: totalHours});
    }

    getDailyEmployeeReportByMonthFromDB = (employeeName: string, month: number) => {
        return DB.getMonthlyEmployeeReportByDay(employeeName, month);
    }

    getMonthlyHoursSumFromDB = (employeeName: string, month: number) => {
        return DB.getMonthlyHoursSum(employeeName, month);
    }
}
 export = new ReportsService();