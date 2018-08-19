const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth')
const analyticsRouter = require('./routes/analytics')
const orderRouter = require('./routes/order')
const positionRouter = require('./routes/position')
const categoryRouter = require('./routes/category')

const app = express()

const keys = require('./config/keys')
mongoose.connect(keys.mongoURI)
    .then(()=>console.log('MongoDB connected!!!'))
    .catch(error=>console.log(error))

//Защита роутов, нельзя будет заходить на другие роуты без валидного токена
app.use(passport.initialize())
require('./middleware/passport')(passport)

//Красиво обрабатывать и показывает в консоле рез-ты запрсов к api
app.use(require('morgan')('dev'))
//Для обработки запросов к api
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//Возможность обрабатывать запросы с других доменов
app.use(require('cors')())

app.use('/api/auth', authRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/order', orderRouter)
app.use('/api/position', positionRouter)
app.use('/api/category', categoryRouter)

module.exports = app
