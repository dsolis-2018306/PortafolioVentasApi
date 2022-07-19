'use strict'

const mongoose = require('mongoose');
const { stringify } = require('querystring');

const categoriesSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Categories', categoriesSchema);