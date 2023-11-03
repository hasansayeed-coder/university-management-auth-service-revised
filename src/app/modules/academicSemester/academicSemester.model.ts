import { Schema, model } from "mongoose";
import { IAcademicSemester , AcademicSemesterModel } from "./academicSemester.interface";
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from "./academicSemester.Constant";
import ApiError from "../../../errors/ApiError";

import status from 'http-status' ;






const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: { 
        type: String, 
        required: true , 
        enum : academicSemesterTitles
    },
    year: { 
        type: String, 
        required: true 
    },
    code: {
        type: String ,
        required : true , 
        enum : academicSemesterCodes
    } , 
    startMonth : {
        type: String , 
        required : true , 
        enum : academicSemesterMonths,
    },
    endMonth : {
        type : String , 
        required : true,
        enum : academicSemesterMonths,
    }
} , {
    timestamps : true
});

academicSemesterSchema.pre('save' , async function(next){
    const isExist = await AcademicSemester.findOne({title : this.title, year : this.year});

    if(isExist){
        throw new ApiError(status.CONFLICT , 'Academic Semester already exists')
    } 
    next() ;
})

export const AcademicSemester = model<IAcademicSemester , AcademicSemesterModel>(
    'AcademicSemester' , academicSemesterSchema
)

// handling same year and same semester duplicate issue



// data -> check -> same year  && same semeter
// we have to implement a prehook to check is the exact year and semester already exists in the database.
//We have to checkl in the documentation

// same year && same semester -> duplicate entry