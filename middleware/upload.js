//Для работы с файлами
const multer = require('multer')
//Работа с датами
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb){
        //1-нет ошибок, 2-Папка в которую будет класть файлы
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})
const fileFilter = (req, file, cb)=>{
    //Является ли файл картинкой
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const limits = {
    fileSize : 1024*1024*5
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})
