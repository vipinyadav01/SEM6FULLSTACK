const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: String },
    createdBy: { type: String },
    updatedAt: { type: String },
    updatedBy: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
