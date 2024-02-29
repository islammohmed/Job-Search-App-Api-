import express from 'express'
import { protectedRoutes } from '../user/controller/user.js'
import allowedTo from '../../middleware/allowedTo.js'
import { exportExcel } from './excel.controller.js'

export const excelRouter = express.Router()

excelRouter.get('/',protectedRoutes,allowedTo('Company_HR'),exportExcel)