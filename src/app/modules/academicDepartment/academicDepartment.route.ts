import express from "express" ;
import { AcademicDepartmentController } from "./academicDepartment.controller";
import ValidateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";



const router = express.Router() ;

router.post('/create-department' , ValidateRequest(AcademicDepartmentValidation.createDepartmentZodSchema) , AcademicDepartmentController.createDepartment) ; 

router.get("/" , AcademicDepartmentController.getAllDepartments) ;

router.get("/:id" , AcademicDepartmentController.getSingleDepartment);

router.patch("/:id" , ValidateRequest(AcademicDepartmentValidation.updateAcademicDepartmentZodSchema) , AcademicDepartmentController.updateAcademicDepartment) ;

router.delete('/:id' , AcademicDepartmentController.deleteDepartment) ;


export const AcademicDepartmentRoutes = { router } ;