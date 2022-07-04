const mongoose = require("mongoose");
const schema = mongoose.Schema;

const store = new schema(
{
    storeID: {type: String, required: true},
    storeName: {type: String},
    storeAddress: {
        area: {type: String},
        province: {type: String},
        district: {type: String},
        address: {type: String}
    },
    email: {type: String},
    dayStart: {type: Date, default: Date.now()},
    status: {type: String},
    productCategory:[
        {
            id: {type: String},
            category: {type: String}
        }
    ]
}
);
module.exports = mongoose.model("stores", store);
