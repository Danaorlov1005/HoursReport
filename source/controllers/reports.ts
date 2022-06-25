import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import reportService from '../services/reports';
import { EmployeeRecord, formatWithHours } from '../types';

// adding a report - assuming the end and start date are recienved in this format by some
// client interface for the employees
const addReport = async (req: Request, res: Response, next: NextFunction) => {
    let employeeRecord: EmployeeRecord = req.body;
    if(validateReport(employeeRecord.employeeName, employeeRecord.startHour, employeeRecord.endHour)){
        reportService.addReportToDb(employeeRecord);
        return res.status(200).json({'success' : 'Reported hours successfully'});
    }
    return res.status(400).json({'error':'Please use a correct date format and enter a name'}); 
};

const getDailyReportByMonth = async(req: Request, res: Response, next: NextFunction) => {
    let employeeName: string = req.params.employeeName;
    let month: number = parseInt(req.params.month, 10);

    let reports = reportService.getMonthlyEmployeeReportByDayFromDB(employeeName, month);
    return res.status(200).json({
        title: "daily report for " + employeeName + " for the " + month + " month",
        reports: reports
    });
}

const getMonthlyHoursSum = async(req: Request, res: Response, next: NextFunction) => {
    let employeeName: string = req.params.employeeName;
    let month: number = parseInt(req.params.month, 10);

    let sum = reportService.getMonthlyHoursSumFromDB(employeeName, month);
    return res.status(200).json({
        title: "Hours sum of " + employeeName + " for the " + month + " month",
        HoursSum: sum
    });
}

const validateReport = (name: string, startHour: string, endHour: string) => {
    const start = moment(startHour, formatWithHours);
    const end = moment(endHour, formatWithHours);
    return(start.isValid() && end.isValid() && (name.length > 0));
}

export default { addReport, getDailyReportByMonth, getMonthlyHoursSum };