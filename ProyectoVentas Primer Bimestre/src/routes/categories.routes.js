'use strict'

const categoriesController = require("../controllers/categories.controller");
const express = require("express");
const api = express.Router();
const mdAuth = require("../services/authenticated");

api.get('/test', categoriesController.test);
api.post('/saveCat',[mdAuth.ensureAuth,mdAuth.isAdmin], categoriesController.saveCategory);
api.delete('/delete/:id',[mdAuth.ensureAuth, mdAuth.isAdmin],categoriesController.deleteCategory);
api.get('/getCategories',mdAuth.ensureAuth,categoriesController.getCategories);
api.get('/getCategory/:id',mdAuth.ensureAuth,categoriesController.getCategory);

module.exports = api;
