const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth')
const analyticsRouter = require('./routes/analytics')
const orderRouter = require('./routes/order')
const positionRouter = require('./routes/position')
const categoryRouter = require('./routes/category')

const app = express()

//Для обработки запросов к api
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/order', orderRouter)
app.use('/api/position', positionRouter)
app.use('/api/category', categoryRouter)

module.exports = app
