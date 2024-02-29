import express from 'express'
const userRouter = express.Router()
import { validation } from '../../middleware/validation.js'
import { changePasswordVal, forgetPasswordval, getAccountsVal, resetPasswordVal, signUpValidation, signinValidation, updateAccountVal } from './user.validation.js'
import { checkEmail } from '../../middleware/checkEmail.js'
import { deleteAccount, forgetPassword, getAllAcounts, protectedRoutes, resetPassword, signIn, signUp, updateAccount, updatePassword } from './controller/user.js'

userRouter.post('/signUp', validation(signUpValidation), checkEmail, signUp)
userRouter.post('/signIn', validation(signinValidation), signIn)
userRouter.post('/forgetPassword', protectedRoutes, validation(forgetPasswordval), forgetPassword)
userRouter.post('/resetPassword', protectedRoutes, validation(resetPasswordVal), resetPassword)
userRouter.post('/getAccounts', validation(getAccountsVal), getAllAcounts)


userRouter
    .route('/')
    .patch(protectedRoutes, validation(changePasswordVal), updatePassword)
    .put(protectedRoutes, validation(updateAccountVal), updateAccount)
    .delete(protectedRoutes, deleteAccount)
export { userRouter }