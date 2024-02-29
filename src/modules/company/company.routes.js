import express from 'express'
const companyRouter = express.Router()
import { validation } from '../../middleware/validation.js'
import { addCompany, deletecompany, getAllApplication, getCompany, searchCompany, updatecompany } from './controller/company.js'
import allowedTo from '../../middleware/allowedTo.js'
import { protectedRoutes } from '../user/controller/user.js'
import { addCompanyValidation, getCompanyJobVal, updateCompanyValidation } from './company.validation.js'

companyRouter.get('/getCompanyWithJob/:id', protectedRoutes, validation(getCompanyJobVal), allowedTo('Company_HR'), getCompany)
companyRouter.get('/', protectedRoutes, allowedTo('Company_HR', 'user'), searchCompany)
companyRouter.get('/getApplicant', protectedRoutes, allowedTo('Company_HR'), getAllApplication)

companyRouter.route('/')
    .post(protectedRoutes, allowedTo('Company_HR'), validation(addCompanyValidation), addCompany)
    .put(protectedRoutes, allowedTo('Company_HR'), validation(updateCompanyValidation), updatecompany)
    .delete(protectedRoutes, allowedTo('Company_HR'), deletecompany)


export { companyRouter }