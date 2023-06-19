import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import routes from './routes'
import connectToDatabase from './config/dbConnect'

connectToDatabase()

const app = express()

app.use(cors())

app.disable('x-powered-by')

routes(app)

app.listen(process.env.PORT || 3000, () => {
  console.log(`💡 Server running on port: ${process.env.PORT}`)
})
