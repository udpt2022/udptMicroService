const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderTicket = new schema(
{
    productList:[
        {
            productID: { type: String },
            productName: { type: String },
            price: { type: String },
            quantity: { type: String}
        }
    ],
    customerID: { type:String, required: true},
    status: { type: String , required: true}, 
    total: { type: String}
}
);
module.exports = mongoose.model("order-tickets", orderTicket);
