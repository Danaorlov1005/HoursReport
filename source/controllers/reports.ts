import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Employee {
    employeeName: String;
}