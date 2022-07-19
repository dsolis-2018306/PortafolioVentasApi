'use strict'
const productController = require("../controllers/product.controller");
const express = require("express");
const api = express.Router();
const mdAuth = require("../services/authenticated");

api.get('/test',productController.test);
api.post('/save',[mdAuth.ensureAuth,mdAuth.isAdmin],productController.saveProduct);
api.delete('/delete/:id',[mdAuth.ensureAuth,mdAuth.isAdmin],productController.deleteProduct);
api.get('/getProducts',mdAuth.ensureAuth,productController.getProducts);
api.get('/getProduct/:id',mdAuth.ensureAuth,productController.getProduct);
api.put('/update/:id',[mdAuth.ensureAuth, mdAuth.isAdmin],productController.productUpdate);
api.get('/notAvailable',mdAuth.ensureAuth,productController.notAvailableProducts);
api.get('/bestPair',mdAuth.ensureAuth,productController.bestPair);
module.exports = api;

 
