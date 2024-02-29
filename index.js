import express from 'express'
import dbConnection from './db/db.connection.js'
import { config } from 'dotenv'
import { bootstrab } from './src/modules/index.routes.js'
const app = express()
dbConnection()
config()
app.use(express.json())
const port = 3000
app.use('/uploads',express.static('uploads'))
bootstrab(app)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))