import express from "express" ; 
import { AcademicFacultyController } from "./academicFacultycontroller";
import ValidateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";


const router = express.Router() ;

router.post('/create-faculty' , ValidateRequest(AcademicFacultyValidation.createFacultyZodSchema),  AcademicFacultyController.createFaculty) ; 

router.get('/:id' , AcademicFacultyController.getSingleFaculty) ; 

router.get('/' , AcademicFacultyController.getAllFaculties) ;

router.delete('/:id' , AcademicFacultyController.deleteFaculty);

router.patch('/:id' ,  ValidateRequest(AcademicFacultyValidation.updateFacultyZodSchema) , AcademicFacultyController.updateFaculty) ; 

export const AcademicFacultyRoutes = {router} ;