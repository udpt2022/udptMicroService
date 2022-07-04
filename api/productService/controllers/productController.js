const productModel = require('../models/productModel')

function productController() {
    const SELF = {
    };
    return {
        postProduct: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                let productData = new productModel;
                if (!formData['productID'] ){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            productData.productID = formData['productID']
            productData.productName = formData['productName']
            productData.price = formData['price']
            productData.unit = formData['unit']
            productData.inventoryNumber = formData['inventoryNumber']
            await productData.save()
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        updateProduct: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                if (!formData['productID'] ){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }          
            await productModel.findOneAndUpdate(
                {
                    productID: formData['productID']
                },
                {
                    $set:{
                        productName: formData['productName'],
                        price : formData['price'],
                        unit : formData['unit']
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
        getCommentProduct: async (req, res, next) => {
            try {
                let productID = req.params.id;
                let comment = await productModel.findOne(
                {
                    productID: productID
                }
            ).select({ "comment": 1, "_id": 0})
            return res.status(200).json(comment)
            } catch (error) {
                return res.status(400).json(error);
            }
        }
    };
}

module.exports = new productController();
