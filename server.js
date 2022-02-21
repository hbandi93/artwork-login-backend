const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeUrls = require('./routes/routes')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database is connected succesfully"))

app.use(express.json())
app.use(cors())
app.use('/artworkBE', routeUrls)
app.listen(4000,() => console.log("yaaay, server is OK and running"))

