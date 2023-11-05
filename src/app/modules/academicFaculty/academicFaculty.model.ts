import { Schema, model } from "mongoose";
import { AcademicFacultyModel, IAcademicFaculty } from "./academicFaculty.interface";


const AcademicFacultySchema = new Schema<IAcademicFaculty>({
    title: { 
        type: String, 
        required: true 
    }, 
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>('AcademicFaculty' , AcademicFacultySchema);
