'use strict'

const mongoose = require('mongoose');

const kartSchema = mongoose.Schema({
    user: {type:mongoose.Schema.ObjectId, ref: 'User'},
    products: [{
        productID: {type: mongoose.Schema.ObjectId, ref: 'Product'},
        name: String,
        price: Number,
        quantity: Number,
        subTotal: Number
    }],
    total:Number
});

module.exports=mongoose.model('kart', kartSchema);