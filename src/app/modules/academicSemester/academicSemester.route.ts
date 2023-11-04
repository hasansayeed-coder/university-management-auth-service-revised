import express from "express" ; 
import { AcademicSemesterValidation } from "./academicSemester.validation";
import ValidateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academicSemester.controller";



const router = express.Router() ;

router.post('/create-semester' , ValidateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), AcademicSemesterController.createSemester) ;

router.patch('/:id' , ValidateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),AcademicSemesterController.updateSemester) ;

router.get('/' , AcademicSemesterController.getAllSemester) ;

router.get('/:id' , AcademicSemesterController.getSingleSemester) ;



export const AcademicSemesterRoutes = {router} ;

/*
    Ensure 01 : 

    Route Level : update --> title , code --> Give me code and title or neither

    Ensure 02 :

    Service Level : update ----> Mapping title and code
*/