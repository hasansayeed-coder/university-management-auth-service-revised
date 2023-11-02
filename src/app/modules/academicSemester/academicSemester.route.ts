import express from "express" ; 
import { AcademicSemesterValidation } from "./academicSemester.validation";
import ValidateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academicSemester.controller";



const router = express.Router() ;

router.post('/create-semester' , ValidateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), AcademicSemesterController.createSemester) ;

router.get('/' , AcademicSemesterController.getAllSemester) ;

export const AcademicSemesterRoutes = {router} ;