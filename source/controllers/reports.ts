import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

interface employeeReport {
    employeeName: string;
    startHour: string;
    endHour: string;
}

// adding a report - assuming the end and start date are recienved in this format by some
// client interface for the employees
const addReport = async (req: Request, res: Response, next: NextFunction) => {
    let employeeRecord: employeeReport = req.body;
    if(validateHours(employeeRecord.startHour, employeeRecord.endHour)){
        let hoursDiffForDb = moment(employeeRecord.endHour).diff(employeeRecord.startHour, "hours");;
        console.log(hoursDiffForDb);

        return res.status(200).json({'success' : 'Reported hours successfully'});
    }
    return res.status(400).json({'error':'Please use a correct date format: DD-MM-YYYY HH:mm:ss'}); 
};

const validateHours = (startHour: string, endHour: string) => {
    const format = "DD-MM-YYYY HH:mm:ss";
    return(moment(startHour, format, true).isValid() && moment(endHour, format, true).isValid())
}

export default { addReport };