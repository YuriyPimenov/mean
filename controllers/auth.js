module.exports.login = (req,res)=>{
    res.status(200).json({
        message:'Залогинились'
    })
}
module.exports.register = (req,res)=>{
    res.status(200).json({
        message:'Зарегались'
    })
}