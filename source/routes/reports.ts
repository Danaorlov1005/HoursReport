import express from 'express';
import controller from '../controllers/reports';
const router = express.Router();

router.post('/reports', controller.addReport);

export = router;