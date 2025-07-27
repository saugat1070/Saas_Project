import { Request,Response } from "express";
import sequelize from "../../database/connection";
import { instituteNumber } from "../../utils/instituteNumber";


class InstituteController{
    public async createInstitute(req:Request,res:Response){
        const {instituteName,instituteEmail,institutePhoneNumber,
            instituteAddress
        } = req.body;
        const instituteVatNumber = req.body.instituteVatNumber || null;
        const institutePanNumber = req.body.institutePanNumber || null;
        if(!instituteEmail || !instituteName || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message : "please provide institute name,number,email and phone number"
            });
            return;
        }

        const institutenumber= instituteNumber()
        await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${institutenumber}(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            instituteName VARCHAR(255) NOT NULL,
            instituteEmail VARCHAR(255) NOT NULL UNIQUE,
            institutePhoneNumber VARCHAR(255) NOT NULL,
            instituteAddress VARCHAR(255) NOT NULL,
            institutePanNo VARCHAR(255),
            instituteVatNo VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`);
/* 
INSERT INTO institute_${institutenumber}(
instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePhoneNumber
)

*/
        await sequelize.query(`INSERT INTO institute_${institutenumber}(
            instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo
            ) VALUES (?,?,?,?,?,?)`,{
                replacements : [instituteName,instituteEmail,instituteEmail,institutePhoneNumber,institutePanNumber,instituteVatNumber]
            })

            res.status(200).json({
                message : "Database table is created"
            });
    }
}

const instituteController = new InstituteController();
export {instituteController};