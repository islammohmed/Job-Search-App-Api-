import { catchError } from './catchError.js'
import { userModel } from './../../db/models/user.model.js'
import { AppError } from '../utils/AppError.js'

export const checkEmail = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) next(new AppError('email already exist', 409))
    next()
})