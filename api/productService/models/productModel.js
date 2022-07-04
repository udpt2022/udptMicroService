const mongoose = require("mongoose");
const schema = mongoose.Schema;

const product = new schema(
{
    productID: { type: String, required: true},
    productName: { type: String }, 
    storeID: { type: String },
    price: { type: String},
    unit: { type: String },
    inventoryNumber: { type: String },
    sold: { type: String },
    comment: [
        { 
            byUser: { type: String },
            comment: { type: String}
        }
    ]
}
);
module.exports = mongoose.model("product-detail", product);
