import multer from 'multer'
import mongoose from 'mongoose'
import { AppError } from './../../src/utils/AppError.js'

export const fileUpload = () => {
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('application')) {
            cb(null, true)
        } else {
            cb(new AppError('application only', 401), false)
        }

    }
    const upload = multer({ storage: storage, fileFilter })
    return upload
}
export const uploadsingleFile = fieldName => fileUpload().single(fieldName)