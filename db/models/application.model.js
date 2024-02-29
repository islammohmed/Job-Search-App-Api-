import mongoose from "mongoose";

const schema = new mongoose.Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: 'job'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    userTechSkills: [{
        type: String,
        required: true
    }],
    userSoftSkills: [{
        type: String,
        required: true
    }],
    userResume: {
        type: String,
        required: true
    },

},
    {
        timestamps: true, toJSON: { virtuals: true }
    })
schema.virtual('user', {
    ref: 'user',
    localField: 'userId',
    foreignField: '_id'
});
schema.post('init', function (doc) {
    doc.userResume = process.env.BASE_URL + 'uploads/' + this.userResumes
})

export const applicationModel = mongoose.model('application', schema)