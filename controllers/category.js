const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async (req,res)=>{
    try{
        const categories = await Category.find({
            user: req.user.id//user берётся из passport
        })
        res.status(200).json(categories)
    }catch(e){
        errorHandler(res, e)
    }
}
module.exports.getById = async (req,res)=>{
    try{
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    }catch(e){
        errorHandler(res, e)
    }
}
module.exports.remove = async (req,res)=>{
    try{
        await Category.remove({_id:req.params.id})
        //Раз мы удалили Категорию, значит и нужно удалять позиции привязанные к этой категории
        await Position.remove({category:req.params.id})
        res.status(200).json({message: "Категория удалена."})
    }catch(e){
        errorHandler(res, e)
    }
}
module.exports.create = async (req,res)=>{
    try{
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id//user берётся из passport
        })
        res.status(200).json(positions)
    }catch(e){
        errorHandler(res, e)
    }
}
module.exports.update =async (req,res)=>{
    try{
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id//user берётся из passport
        })
        res.status(200).json(positions)
    }catch(e){
        errorHandler(res, e)
    }
}
