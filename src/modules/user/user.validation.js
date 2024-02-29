import joi from 'joi'
export const signUpValidation = joi.object({
    firstName: joi.string().min(3).max(15).required(),
    lastName: joi.string().min(3).max(15).required(),
    email: joi.string().email().required(),
    recoveryEmail: joi.string().email().required(),
    password: joi.string().pattern(/^[A-z][a-z0-9@#]{8,40}$/).required(),
    rePassword: joi.valid(joi.ref('password')).required(),
    mobileNumber: joi.string().pattern(/^\+(20)\d{1,2}\d{7,8}$/).required(),
    DOB: joi.date().required(),
})
export const signinValidation = joi.object({
    email: joi.string().email().optional(),
    mobileNumber: joi.string().pattern(/^\+(20)\d{1,2}\d{7,8}$/).optional(),
    password: joi.string().required()
})
export const changePasswordVal = joi.object({
    oldPassword: joi.required(),
    newPassword: joi.string().pattern(/^[A-z][a-z0-9@#]{8,40}$/).required(),
    repNewPassword: joi.valid(joi.ref('newPassword')).required(),
})
export const updateAccountVal = joi.object({
    firstName: joi.string().min(3).max(15).optional(),
    lastName: joi.string().min(3).max(15).optional(),
    email: joi.string().email().optional(),
    mobileNumber: joi.string().pattern(/^\+(20)\d{1,2}\d{7,8}$/).optional(),
    DOB: joi.date().optional(),
    recoveryEmail: joi.string().email().optional()
})
export const forgetPasswordval = joi.object({
    email: joi.string().email().required()
})
export const resetPasswordVal = joi.object({
    code: joi.string().required(),
    email: joi.string().email().required(),
    newPassword: joi.string().pattern(/^[A-z][a-z0-9@#]{8,40}$/).required(),
    repNewPassword: joi.valid(joi.ref('newPassword')).required(),
})
export const getAccountsVal = joi.object({
    recoveryEmail: joi.string().email().required(),
})

