import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { academicSemesterTitleMapper } from "./academicSemester.Constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createSemester = async(payload : IAcademicSemester) : Promise<IAcademicSemester>=> {

    
if(academicSemesterTitleMapper[payload.title] !== payload.code){
    throw new ApiError(httpStatus.BAD_REQUEST , 'Invalid Semester Code') ;
}


    const result = await AcademicSemester.create(payload) ; 

    return result ;
}


export const AcademicSemesterService = {
    createSemester , 
}