require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors());
app.use(express.json())

const tasksRouter = require('./routes/tasks')
app.use('/tasks', tasksRouter)

app.listen(process.env.PORT, () => console.log('Server Started'))