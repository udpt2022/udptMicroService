const mongoose = require("mongoose");
const schema = mongoose.Schema;

const checkOut = new schema(
{
    cusID: { type: String, required: true},
    status: { type: String }, 
    dateCreated: { type: Date, default: Date.now() },
    dateCheckOut: { type: Date},
    totalPrice: { type: String }
}
);
module.exports = mongoose.model("check-outs", checkOut);
