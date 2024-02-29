import { catchError } from '../../../middleware/catchError.js'
import { userModel } from '../../../../db/models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppError } from '../../../utils/AppError.js'
import { nanoid } from 'nanoid'

export const signUp = catchError(async (req, res, next) => {
    req.body.userName = req.body.firstName + req.body.lastName
    let user = new userModel(req.body)
    await user.save()
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
    res.send({ msg: 'success', token })
})

export const signIn = catchError(async (req, res, next) => {
    if (req.body.email) {
        let user = await userModel.findOne({ email: req.body.email })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
            await userModel.findOneAndUpdate({ email: user.email }, { status: 'online' })
            return res.send({ msg: 'success', token })
        }
        return next(new AppError('incorrect email or password', 401))
    }
    else if (req.body.mobileNumber) {
        let user = await userModel.findOne({ mobileNumber: req.body.mobileNumber })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
            await userModel.findOneAndUpdate({ mobileNumber: user.mobileNumber }, { status: 'online' })
            return res.send({ msg: 'success', token })
        }
        return next(new AppError('incorrect mobileNumber or password', 401))
    } else {
        next(new AppError('please enter email or mobile number', 401))
    }
})

export const updateAccount = catchError(async (req, res, next) => {
    const { firstName, lastName, email, mobileNumber, recoveryEmail, DOB } = req.body
    if (firstName) {
        req.user.firstName = firstName
        req.user.userName = firstName + req.user.lastName
    }
    if (lastName) {
        req.user.lastName = lastName
        req.user.userName = req.user.firstName + "" + lastName
    }
    if (email) {
        let conflictEmail = await userModel.findOne({ email })
        if (!conflictEmail)
            req.user.email = email
        else
            return next(new AppError('Email already exist', 409))
    }
    if (mobileNumber) {
        let conflictMobileNumber = await userModel.findOne({ mobileNumber })
        if (!conflictMobileNumber)
            req.user.mobileNumber = mobileNumber
        else
            return next(new AppError('mobileNumber already exist', 409))
    }
    if (recoveryEmail) {
        req.user.recoveryEmail = recoveryEmail
    }
    if (DOB) {
        req.user.DOB = DOB
    }
    await req.user.save()
    res.send({ msg: 'success' })
})


export const updatePassword = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.user._id)
    let { oldPassword, newPassword } = req.body
    if (user && bcrypt.compareSync(oldPassword, user.password)) {
        await userModel.findByIdAndUpdate(req.user._id, { password: newPassword, passwordChangedAt: Date.now() })
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
        res.send({ msg: 'success', token })
    }
    next(new AppError('incorrect password', 401))

})

export const protectedRoutes = catchError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) next(new AppError('invalid token', 401))
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    let user = await userModel.findById(decoded.userId)
    if (!user) next(new AppError('user not found', 404))
    if (user.passwordChangedAT) {
        let time = parseInt(user?.passwordChangedAT.getTime() / 1000)
        if (time > decoded.iat) next(new AppError('invalid token..logIn again'))
    }
    req.user = user
    next()
})

export const deleteAccount = catchError(async (req, res, next) => {
    await userModel.findByIdAndDelete(req.user._id)
    res.send({ msg: 'success' })
})

export const forgetPassword = catchError(async (req, res, next) => {
    const OTPCode = nanoid(4);
    await userModel.findOneAndUpdate({ email: req.body.email }, { OTPCode })
    return res.send(OTPCode)
})
export const resetPassword = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email, OTPCode: req.body.code })
    if (!user) {
        return next(new AppError('user not fount or invalid code ', 404))
    }
    await userModel.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordChangedAt: Date.now() })
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
    res.send({ msg: 'success', token })
})

export const getAllAcounts = catchError(async (req, res, next) => {
    let accounts = await userModel.find({ recoveryEmail: req.body.recoveryEmail })
    res.send({ msg: "success", accounts })
})