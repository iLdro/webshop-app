const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    inCardQuantity : {
        type: Number,
        required: true
    },
    oldQuantity : {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', produitSchema);
module.exports = Product;