import { IAcademicSemesterCode, IAcademicSemesterTitles, IAcademicSemestersMonths } from "./academicSemester.interface";


export const academicSemesterCodes : IAcademicSemesterCode[] = [
    '01' ,  '02' , '03'
] 

export const academicSemesterTitles : IAcademicSemesterTitles[] = [
    'Autumn' , 'Summer' , 'Fall'
]

export const academicSemesterMonths : IAcademicSemestersMonths[] =[

    'January' ,
    'February' ,
    'March' ,
    'April',
    'May' ,
    'June' ,
    'July' ,
    'August' ,
    'September' ,
    'October' ,
    'November' ,
    'December'
]

export const academicSemesterTitleMapper : {
    [key : string] : string
} = {
    Autumn : '01' , 
    Summer : '02' ,
    Fall : '03',
}

