'use strict'

const {validateData,checkUpdate,searchProduct}=require('../utils/validate');
const Product=require('../models/product.model');
const req = require('express/lib/request');
const res = require('express/lib/response');

exports.test = (req, res)=>{
    return res.send({message: 'Function test is running'});

} 
exports.saveProduct = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            price: params.price,
            available: params.available,
            sales: params.sales,
            category: params.category
        } 
            const ds= validateData(data);
            if(!ds){
                let product = new Product(data);
                await product.save();
                return res.send({message: 'Product has been saved'});

            }else return res.status(400).send(ds);

    }catch(err){
        console.log(err);
        return err;
    }
}   
exports.deleteProduct = async(req,res)=>{
    try{
     const productID = req.params.id;
     const deleteProduct = await Product.findOneAndDelete({_id: productID});
     if(deleteProduct){
         return res.send({message: 'Product has been deleted'});
     }else{
         return res.send({message: 'Product has not been found'})
     }
     }catch(err){
         console.log(err);
         return err;
     }
 }
exports.getProducts = async(req, res)=>{
    try{
        const product = await Product.find();
        return res.send(product);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getProduct = async(req, res)=>{
    try{
        const productId = req.params.id;
        const Products = await Product.findOne({_id: productId});
        if(!Products) return res.send({message: 'Product not found'});
        return res.send({Products});
    }catch(err){
        console.log(err);
        return err;
    }
}
exports.productUpdate = async (req, res)=>{
    try{
        const params = req.body;
        const productId = req.params.id;
        const update = await checkUpdate(params);
        if(update === false){
            return res.status(400).send({message: 'Not receiving data'});
        }else{
            if(params.name === '' || params.price === ''||  params.available === '' || params.sales === ''||  params.category === ''){
                res.status(400).send({messagge: 'Empty param or Check params'});
            }else{
                const productUpdate = await Product.findOneAndUpdate({_id: productId}, params, {new: true});
                return res.send({message: 'Product has been update', productUpdate});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
exports.notAvailableProducts= async (req, res)=>{
    try{
        const notAvailableProducts= await Product.find ({available: 0});
        if(notAvailableProducts=== 0){
            return res.send({message:'all products are Available'});
            }else{
        return res.send(notAvailableProducts);
    }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.bestPair = async(req, res)=>{
    try{
        const bestPair = await Product.find().sort({sales: -1});
        return res.send (bestPair);
    }catch(err){
        console.log(err);
        return err;
}
}
