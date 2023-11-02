import express from "express" ; 
import { UserRoutes } from "../modules/users/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

const router = express.Router() ;

const moduleRoutes = [
    {
        path : '/users' , 
        route :  UserRoutes.router
    } , 
    {
        path : '/academic-semesters',
        route : AcademicSemesterRoutes.router
    }
]

// router.use('/users' , UserRoutes.router) ;
// router.use('/academic-semesters' , AcademicSemesterRoutes.router) ;


moduleRoutes.forEach((route) =>router.use(route.path , route.route)) ;




export default router ;