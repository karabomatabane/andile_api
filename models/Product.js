// create mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    }
});

// transform the _id to id for client side
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Product', productSchema); // export the model