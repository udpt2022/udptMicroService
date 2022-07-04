const orderTicketModel = require('../models/orderTicketModel')

function orderTicketController() {
    const SELF = {
    };
    return {
        add: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                let orderData = new orderTicketModel;
                if (!formData['cusID'] || !formData['totalPrice'] || !formData['status']){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            orderData.cusID = formData['cusID']
            orderData.cusID = formData['status']
            orderData.cusID = formData['totalPrice']
            await orderData.save()
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        listByUserID: async (req, res, next) => {
            try {
                let cusID = req.body.cusID
                let orderTicketList = await orderTicketModel.find({customerID: cusID})
                return res.status(200).json({orderTicketList})
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        listAll: async (req, res, next) => {
            try {
                let orderTicketList = await orderTicketModel.find()
                console.log(orderTicketList);
                return res.status(200).json({orderTicketList})
            } catch (error) {
                return res.status(400).json(error);
            }
        }
    };
}

module.exports = new orderTicketController();
