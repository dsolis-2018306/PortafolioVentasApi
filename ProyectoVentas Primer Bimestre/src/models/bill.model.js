'use strict'

const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    kart: {type: mongoose.Schema.ObjectID, ref: 'kart'},
    date: Date,
    user: {type: mongoose.Schema.ObjectID, ref: 'User'},
    products: [{
        productID: {type: mongoose.Schema.ObjectId, ref: 'Product'},
        name: String,
        price: Number,
        quantity: Number,
        subTotal: Number
    }],
    total: Number
})

module.exports = mongoose.model('bill', billSchema);