
import { z } from "zod";

const createZodSchema = z.object({
    body : z.object({
        role : z.string({
            required_error :'role is required'
        }) , 
        password : z.string().optional() 
    })
})

export const UserValidation = {
    createZodSchema,
}


// await createZodSchema.parseAsync(req) ;

// validate request through zod
// body --> object
// data --> object
