import { globalError } from "../middleware/globalError.js";
import { userRouter } from './../modules/user/user.routes.js';
import { companyRouter } from "./company/company.routes.js";
import { excelRouter } from "./excelSheet/excel.routes.js";
import { jobRouter } from "./job/job.routes.js";
export const bootstrab = (app) => {
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/company', companyRouter)
    app.use('/api/v1/job', jobRouter)
    app.use('/api/v1/export', excelRouter)

    app.use(globalError)
} 