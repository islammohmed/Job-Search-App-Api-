import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    recoveryEmail: {
        type: String,
        required: true,
        trim: true
    },
    DOB: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        Enum: ['user', 'Company_HR'],
        default: 'user',
        trim: true
    },
    status: {
        type: String,
        Enum: ['online', 'offline'],
        default: 'offline'
    },
    OTPCode: String,
    passwordChangedAT: Date

},
    {
        timestamps: true
    })
schema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})
schema.pre('findOneAndUpdate', function () {
    if (this._update.password) { this._update.password = bcrypt.hashSync(this._update.password, 8) }
})

export const userModel = mongoose.model('user', schema)