import mongoose from "mongoose";

const schema = new mongoose.Schema({
    jobTitle: {
        type: String,
        trim: true,
        required: true
    },
    jobLocation: {
        type: String,
        required: true,
        trim: true,
        Enum: ['onsite', 'remotely', 'hybrid']
    },
    workingTime: {
        type: String,
        Enum: ['part-time', 'full-time'],
        required: true,
        trim: true
    },
    jobDescription: {
        type: String,
        require: true
    },
    technicalSkills: [{
        type: String,
        required: true,
        trim: true
    }],
    softSkills: [{
        type: String,
        required: true,
        trim: true
    }],
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        trim: true
    },
    seniorityLevel: {
        type: String,
        Enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
        required: true,
        trim: true
    }

},
    {
        timestamps: true, toJSON: { virtuals: true }
    })
schema.virtual('companies', {
    ref: 'company',
    localField: 'addedBy',
    foreignField: 'companyHR'
});
schema.pre('find', function () {
    this.populate('companies')
})
export const jobModel = mongoose.model('job', schema)