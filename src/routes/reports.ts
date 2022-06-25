import express from 'express';
import controller from '../controllers/reports';
const router = express.Router();

router.post('/reports', controller.addReport);
router.get('/reports/monthlyreport/:employeeName/:month', controller.getDailyReportByMonth);
router.get('/reports/sum/:employeeName/:month', controller.getMonthlyHoursSum);

export = router;