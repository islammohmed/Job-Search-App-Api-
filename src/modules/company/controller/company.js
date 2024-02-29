import { catchError } from '../../../middleware/catchError.js'
import { userModel } from '../../../../db/models/user.model.js'
import { AppError } from '../../../utils/AppError.js'
import { companyModel } from '../../../../db/models/company.model.js'
import { jobModel } from './../../../../db/models/job.model.js'
import { applicationModel } from '../../../../db/models/application.model.js'

export const addCompany = catchError(async (req, res, next) => {
    let isExistName = await companyModel.findOne({ name: req.body.name })
    if (isExistName) return next(new AppError('comapany Name already exist', 409))
    let isExistEmail = await companyModel.findOne({ companyEmail: req.body.email })
    if (isExistEmail) return next(new AppError('comapany Email already exist', 409))
    req.body.companyHR = req.user._id
    let min = req.body.min, max = req.body.max
    req.body.numberOfEmployees = { min, max }
    let company = new companyModel(req.body)
    await company.save()
    res.send({ msg: 'success', company })
})

export const updatecompany = catchError(async (req, res, next) => {
    const { name, description, industry, address, companyEmail, min, max } = req.body
    let company = await companyModel.findOne({ companyHR: req.user._id })
    if (!company) return next(new AppError('company not founded', 404))
    if (description) {
        company.description = description
    }
    if (name) {
        let conflictName = await userModel.findOne({ name })
        if (!conflictName)
            company.name = name
        else
            return next(new AppError('name already exist', 409))
    }
    if (companyEmail) {
        let conflictCompanyEmail = await userModel.findOne({ companyEmail })
        if (!conflictCompanyEmail)
            company.companyEmail = companyEmail
        else
            return next(new AppError('companyEmail already exist', 409))
    }
    if (industry) {
        company.industry = industry
    }
    if (address) {
        company.address = address
    }
    if (min) {
        company.numberOfEmployees = { min, max: company.numberOfEmployees.max }
    }
    if (max) {
        company.numberOfEmployees = { max, min: company.numberOfEmployees.min }
    }
    await company.save()
    res.send({ msg: 'success' })
})

export const deletecompany = catchError(async (req, res, next) => {
    await companyModel.findOneAndDelete({ companyHR: req.user._id })
    res.send({ msg: 'success' })
})

export const getCompany = catchError(async (req, res, next) => {
    let company = await companyModel.findById(req.params.id)
    if (!company) return next(new AppError('comapany not founded', 404))
    let job = await jobModel.find({ addedBy: company.companyHR })
    let companywithJob = company.toObject()
    companywithJob.job = job
    res.send({ msg: 'success', companywithJob })
})

export const searchCompany = catchError(async (req, res, next) => {
    let company = await companyModel.findOne({ name: req.query.name })
    if (!company) {
        res.send({ msg: 'company not founded' })
    }
    res.send({ msg: 'success', company })
})

export const getAllApplication = catchError(async (req, res, next) => {
    let applications = await applicationModel.find({ jobId: req.user._id }).populate('user')
    res.send({ msg: 'success', applications })
})

