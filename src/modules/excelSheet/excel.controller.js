import { catchError } from "../../middleware/catchError.js";
import excelJs from 'exceljs'
import fs from 'fs'
import { applicationModel } from "../../../db/models/application.model.js";
import { companyModel } from "../../../db/models/company.model.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const exportExcel = catchError(async(req,res,next)=>{
    let companyData = await companyModel.findOne({companyHR:req.user._id})
    let application = await applicationModel.find({jobId : companyData.companyHR})
    const workbook = new excelJs.Workbook();
    const worksheet = workbook.addWorksheet('applications');

    worksheet.columns = [
        {header:"Day", key:"day", width:50}, 
        {header:"User Tech Skills", key:"userTechSkills", width:50},
        {header:"User Soft Skills", key:"userSoftSkills", width:50},
        {header:"Resume", key:"resume", width:50},
    ]
    application.map(async(value,idx) => {
        worksheet.addRow({
            day: value.createdAt,
            userTechSkills: value.userTechSkills,
            userSoftSkills: value.userSoftSkills,
            resume: value.userResume
        })})

        const outputDir = path.join(__dirname, 'excelSheet');
        if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
        }

        const outputFile = 'output.xlsx';
        const outputFilePath = path.join(outputDir, outputFile);
        await workbook.xlsx.writeFile(outputFilePath);
        console.log(`Data exported to ${outputFilePath}`);
        res.sendFile(outputFilePath);

}); 
