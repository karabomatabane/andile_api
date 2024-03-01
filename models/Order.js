/*
{
    "id": string,
    "paid": boolean,
    "customerId": string,
    "products": string[] (list of ids)
    "total": float
}*/

//create mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    paid: {
        type: Boolean,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

//transform the _id to id for client side
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });

module.exports = mongoose.model('Order', orderSchema); //export the model