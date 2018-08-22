//Для паролей
const bcrypt = require('bcryptjs')
//Генерация токена
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req,res)=>{
    const candidate = await User.findOne({email: req.body.email})
    if(candidate){
        //Пользователь такой есть
        //Проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,//Первый параметр это ключи которвый
                userId: candidate._id//можно зашифровать в токене
            },keys.jwt,//Секретный ключ
            {expiresIn: 60*60})//третий, время жизни токена - один час

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            res.status(401).json({
                message: 'Пароли не совпадают, попробуйте снова!!!'
            })
        }
    }else{
        //Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден!!!'
        })
    }
}
module.exports.register = async (req,res)=>{
    //Ищем пользователя в базе
    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //Если он есть в базе, то кидаем ошибку
        res.status(409).json({
            message: 'Такой email уже существует!!!'
        })
    }else{
        //Иначе создаём его

        //Генерируем хэш
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try{
            await user.save()
            res.status(201).json(user)
        }catch(e){
            //Обработка ошибок
            errorHandler(res, e)
        }
    }
}
