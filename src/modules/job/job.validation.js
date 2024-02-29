import joi from 'joi'



export const addJobValidation = joi.object({
    jobTitle: joi.string().min(3).max(50).required(),
    workingTime: joi.string().required(),
    jobDescription: joi.string().min(3).max(200).required(),
    jobLocation: joi.string().required(),
    technicalSkills: joi.array().required(),
    softSkills: joi.array().required(),
    seniorityLevel: joi.string().required(),
})

export const updateJobValidation = joi.object({
    jobTitle: joi.string().min(3).max(50).optional(),
    workingTime: joi.string().optional(),
    jobDescription: joi.string().optional(),
    jobLocation: joi.string().optional(),
    technicalSkills: joi.array().optional(),
    softSkills: joi.array().optional(),
    seniorityLevel: joi.string().optional(),
})

export const filterJobValidation = joi.object({
    jobTitle: joi.string().min(3).max(50).optional(),
    workingTime: joi.string().optional(),
    jobLocation: joi.string().optional(),
    technicalSkills: joi.string().optional(),
    seniorityLevel: joi.string().optional(),
})

export const applayJobValidation = joi.object({
    id: joi.string().hex().length(24).required(),
    userTechSkills: joi.array().required(),
    userSoftSkills: joi.array().required(),
    userResume: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('application/pdf').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    }).required()
})
