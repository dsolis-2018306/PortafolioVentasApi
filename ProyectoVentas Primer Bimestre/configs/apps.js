'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('../src/routes/user.routes');
const categoriesRoutes= require("../src/routes/categories.routes");
const productRoutes = require('../src/routes/product.route');


const app = express(); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/user', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/product',productRoutes);

module.exports = app;