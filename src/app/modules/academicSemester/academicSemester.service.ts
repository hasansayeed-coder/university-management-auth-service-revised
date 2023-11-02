import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { academicSemesterTitleMapper } from "./academicSemester.Constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";

const createSemester = async(payload : IAcademicSemester) : Promise<IAcademicSemester>=> {

    
if(academicSemesterTitleMapper[payload.title] !== payload.code){
    throw new ApiError(httpStatus.BAD_REQUEST , 'Invalid Semester Code') ;
}


    const result = await AcademicSemester.create(payload) ; 

    return result ;
}




const getAllSemester = async(paginationOptions : IPaginationOptions) : Promise<IGenericResponse<IAcademicSemester[]>> => {

    const {page , limit , skip , sortBy , sortOrder} = PaginationHelper.calculatePagination(paginationOptions)

    const sortConditions : {[key : string] : SortOrder} ={

    }

    if(sortBy && sortOrder){
        sortConditions[sortBy] = sortOrder ;
    }

    const result = await AcademicSemester.find().sort(sortConditions).skip(skip).limit(limit) ;
    const total = await AcademicSemester.countDocuments() ;

    return {
        meta : {
            page , 
            limit , 
            total 
        } , 
        data : result
    } ;
}


export const AcademicSemesterService = {
    createSemester , 
    getAllSemester
}