import express, { Application, } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'


const app: Application = express()

app.use(cors())

//parsar//

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users/' , UserRoutes.router) ;





// Testing
// app.get('/', async(req: Request, res: Response , next : NextFunction) => {

//     // Promise.reject(new Error('Unhandled Promise Rejection'))

//     // console.log(x) ;

//     throw new Error("Testing Error Logger!")

// })

/*
//   // res.send("Working Successfully") ;

// throw new ApiError(400 , "HI from error") ;

//   next("Hi from next Error") ;
*/
    

// global Error Handler
app.use(globalErrorHandler) ;


export default app ;
