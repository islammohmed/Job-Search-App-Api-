import express from 'express'
const jobRouter = express.Router()
import { validation } from '../../middleware/validation.js'
import allowedTo from '../../middleware/allowedTo.js'
import { protectedRoutes } from '../user/controller/user.js'
import { addJobValidation, applayJobValidation, filterJobValidation, updateJobValidation } from './job.validation.js'
import { addJob, applayJob, deleteJob, getAllJob, getJob, getSelectedJob, updateJob } from './controller/job.js'
import { uploadsingleFile } from './../../../services/fileUpload/fileUpload.js'

jobRouter.route('/')
    .post(protectedRoutes, allowedTo('Company_HR'), validation(addJobValidation), addJob)
    .put(protectedRoutes, allowedTo('Company_HR'), validation(updateJobValidation), updateJob)
    .delete(protectedRoutes, allowedTo('Company_HR'), deleteJob)
    .get(protectedRoutes, allowedTo('Company_HR', 'user'), getJob)

jobRouter.get('/allJobs', protectedRoutes, allowedTo('Company_HR', 'user'), getAllJob)
jobRouter.get('/selectedJob', protectedRoutes, allowedTo('user', 'Company_HR'), validation(filterJobValidation), getSelectedJob)


jobRouter.post('/applayToJob/:id', uploadsingleFile('userResume'), protectedRoutes, allowedTo('user'), validation(applayJobValidation), applayJob)


export { jobRouter }