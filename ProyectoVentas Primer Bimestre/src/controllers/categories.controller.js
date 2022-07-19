'use strict'

const { message } = require("statuses");
const Categories = require("../models/categories.model");
const { search } = require("../routes/user.routes");
const { validateData,searchCategory } = require("../utils/validate");
const Product = require("../models/product.model");
exports.test = (req, res)=>{
    return res.send({message: 'Function test is running'});

}

exports.saveCategory = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name
        
        };
        const ds = validateData(data);    
        if(!ds){
            data.name=params.name;
            let category = new Categories(data);
            await category.save();
            return res.send({message: 'Category succesfully saved',category});
        }else return res.status(400).send(ds);    

    }catch(err){
        console.log(err);
        return err;
    }
}
exports.deleteCategory = async(req, res)=>{
    try{
        const categoryID = req.params.id;
        const params = req.body;
        const categoryExist = await searchCategory(params.name)
        if(!categoryExist && categoryExist !== 'default'){
            const productsExist = await Product.find({category: categoryID}).lean();
            if(Object.entries(productsExist).length === 0){
                const deleteCategory = await Categories.findOneAndDelete({_id: categoryID});
                return res.send({message: 'Category has been deleted'});
            }else{
                const defaultExist = await Categories.findOne({name: {$regex: 'default', $options: 'i'}});
                const updateProducts = await Product.updateMany({category: categoryID}, {$set: {category: defaultExist}});
                const deleteCategory = await Categories.findByIdAndDelete({_id: categoryID});
                return res.send({message: 'Category has been deleted'})
            }
        }else{
            return res.send({message: 'Category has not been found or default can not delete'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
exports.getCategories = async(req, res)=>{
    try{
        const cate = await Categories.find();
        return res.send({cate});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getCategory = async(req, res)=>{
    try{
        const categoriesId = req.params.id;
        const categories = await Categories.findOne({_id: categoriesId});
        if(!categories) return res.send({message: 'Category not found'});
        return res.send({categories});
    }catch(err){
        console.log(err);
        return err;
    }
}
 
