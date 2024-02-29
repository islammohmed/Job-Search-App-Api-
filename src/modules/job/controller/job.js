import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { jobModel } from '../../../../db/models/job.model.js'
import { companyModel } from './../../../../db/models/company.model.js'
import { applicationModel } from '../../../../db/models/application.model.js'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'dkftv31lf',
    api_key: '975767342569954',
    api_secret: 'I_wE_tLdv4UqtL7H5eQz374mhK0'
});

export const addJob = catchError(async (req, res, next) => {
    req.body.addedBy = req.user._id
    let job = new jobModel(req.body)
    await job.save()
    res.send({ msg: 'success', job })
})

export const updateJob = catchError(async (req, res, next) => {
    let job = await jobModel.findOneAndUpdate({ addedBy: req.user._id }, req.body, { new: true })
    if (!job) return next(new AppError('job  not founded', 404))
    res.send({ msg: 'success', job })
})

export const deleteJob = catchError(async (req, res, next) => {
    let job = await jobModel.findOneAndDelete({ addedBy: req.user._id })
    if (!job) return next(new AppError('job  not founded', 404))
    res.send({ msg: 'success' })
})

export const getJob = catchError(async (req, res, next) => {
    let job = await jobModel.find()
    if (!job) return next(new AppError('job  not founded', 404))
    res.send({ msg: 'success', job })
})

export const getAllJob = catchError(async (req, res, next) => {
    let company = await companyModel.findOne({ name: req.query.name })
    if (!company) return next(new AppError('comapany not founded', 404))
    let job = await jobModel.findOne({ addedBy: company.companyHR })
    res.send({ msg: 'success', job })
})

export const getSelectedJob = catchError(async (req, res, next) => {
    let filter = { ...req.query }
    if (!req.query) return next(new AppError('job  not founded', 404))
    let job = await jobModel.find(filter)
    res.send({ msg: 'success', job })
})

export const applayJob = catchError(async (req, res, next) => {
    req.body.userId = req.user._id
    req.body.jobId = req.params.id
    cloudinary.uploader.upload(req.file.path,
        async (error, result) => {
            req.body.userResume = result.secure_url
            let applicant = new applicationModel(req.body)
            await applicant.save()
            res.send({ msg: 'success', applicant })
        });

})

