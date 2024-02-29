import joi from 'joi'

export const addCompanyValidation = joi.object({
    name: joi.string().min(3).max(50).required(),
    industry: joi.string().min(3).max(50).required(),
    description: joi.string().min(3).max(50).required(),
    address: joi.string().min(10).max(200).required(),
    companyEmail: joi.string().email().required(),
    min: joi.number().min(11).max(20).required(),
    max: joi.number().min(11).max(20).required()
})

export const updateCompanyValidation = joi.object({
    name: joi.string().min(3).max(50).optional(),
    industry: joi.string().min(3).max(50).optional(),
    description: joi.string().min(3).max(50).optional(),
    address: joi.string().min(10).max(200).optional(),
    companyEmail: joi.string().email().optional(),
    min: joi.number().min(11).max(20).optional(),
    max: joi.number().min(11).max(20).optional()
})

export const getCompanyJobVal = joi.object({
    id: joi.string().hex().length(24).required()
})