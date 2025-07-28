import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { instituteNumber } from "../../utils/instituteNumber";
import { IERequest } from "../../config/interface";
import User from "../../database/model/userModel";

class InstituteController {
  public async createInstitute(req: IERequest, res: Response): Promise<void> {
    // if(!req.user){
    //     console.log("user is not login");
    //     res.status(401).json({
    //         message : "please login first"
    //     });
    //     return
    // }
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;
    const instituteVatNumber = req.body.instituteVatNumber || null;
    const institutePanNumber = req.body.institutePanNumber || null;
    if (
      !instituteEmail ||
      !instituteName ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      res.status(400).json({
        message: "please provide institute name,number,email and phone number",
      });
      return;
    }

    const institutenumber = instituteNumber();
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
instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePhoneNumber)VALUES(?,?,?,?,?,?)
)

*/
    await sequelize.query(
      `INSERT INTO institute_${institutenumber}(
            instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo
            ) VALUES (?,?,?,?,?,?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          instituteEmail,
          institutePhoneNumber,
          institutePanNumber,
          instituteVatNumber,
        ],
      }
    );

    /*         await sequelize.query(`CREATE TABLE teacher_${institutenumber}(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            teacherEmail VARCHAR(255) NOT NULL UNIQUE,
            teacherPhoneNumber VARCHAR(255) NOT NULL,
            teacherAddress VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURREN_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`) */

    // req.institute ={
    //     instituteNumber : institutenumber,
    //     instituteName : String(instituteName)
    // } ;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      res.status(401).json({
        message: "please login first",
      });
      return;
    }
    
    user.currentInstituteNumber = institutenumber;

    res.status(200).json({
      message: "Database table is created",
    });
  }

  public createTeacherTable = async (req: IERequest, res: Response) => {
    // const instituteNumber = req.institute?.instituteNumber;
    await sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            teacherEmail VARCHAR(255) NOT NULL UNIQUE,
            teacherPhoneNumber VARCHAR(255) NOT NULL,
            teacherAddress VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURREN_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);

    res.json({
      message: "teacher is created",
    });
  };
}

const instituteController = new InstituteController();
export { instituteController };
