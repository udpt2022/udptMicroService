const cartModel = require('../models/cartModel')

function cartController() {
    const SELF = {
    };
    return {
        addProductToCart: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                let cartData = new cartModel;
                if (!formData['cusID'] ){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            cartData.CustomerID = formData['cusID'];
            await cartModel.findOneAndUpdate(
                {
                    customerID: formData['cusID']
                },
                {
                    $addToSet: {
                        productList:[{
                            productID: formData['productID'],
                            productName: formData['productName'],
                            price: formData['price'],
                            quantity: formData['quantity']
                        }]
                    }
                }
            )
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        removeProductFromCart: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                let cartData = new cartModel;
                if (!formData['cusID'] ){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            cartData.CustomerID = formData['cusID'];
            await cartModel.updateOne(
                {
                    customerID: formData['cusID']
                },
                {
                    $pull: {
                        productList:{
                            productID: formData['productID']
                        }
                    }
                }
            )
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        addQuantity: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                if (!formData['cusID'] ){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            await cartModel.findOneAndUpdate(
                {
                    customerID: formData['cusID'],
                },
                {
                    $set: {
                        'productList.$[product].quantity' : formData['quantity'],
                    }
                },
                {
                    arrayFilters: [{
                        'product.productID': formData['productID'],
                    }]
                }
            )
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        listByUserID: async (req, res, next) => {
            try {
                let cusID = req.params.id;
                let cartList = await cartModel.find({customerID:cusID}).select({ "productList": 1, "_id": 0})
                console.log(cartList)
                return res.status(200).json({cartList})
            } catch (error) {
                return res.status(400).json(error);
            }
        }
    };
}

module.exports = new cartController();
