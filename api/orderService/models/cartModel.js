const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cart = new schema(
{
    productList:[
        {
            productID: { type: String },
            productName: { type: String },
            price: { type: String },
            quantity: { type: String}
        }
    ],
    OrderID: { type: String},
    CustomerID: { type: String},
    Store:{
            storeID: { type: String },
            storeName: { type: String }
        }
    ,
}
);
module.exports = mongoose.model("carts", cart);
