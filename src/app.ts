import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(cors())

//parsar//

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Testing for better world')
})

export default app
