import mongoose from "mongoose"
const dbConnection = ()=>{
        mongoose.connect('mongodb://127.0.0.1:27017/jobSearchApp').then(
            console.log('connection Successfully')
        ).catch(err=>{console.log('faild connection => ' + err);})
}

export default dbConnection