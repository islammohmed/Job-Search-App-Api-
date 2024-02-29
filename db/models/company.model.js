import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    industry: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    numberOfEmployees: {
        min: { type: Number, min: 11, max: 20 },
        max: { type: Number, min: 11, max: 20 }
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    companyHR: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        trim: true
    }

},
    {
        timestamps: true
    })

export const companyModel = mongoose.model('company', schema)