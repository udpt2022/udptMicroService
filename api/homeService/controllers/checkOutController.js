const checkOutModel = require('../models/checkOutModel')

function checkOutController() {
    const SELF = {
    };
    return {
        add: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                let checkOutData = new checkOutModel;
                if (!formData['cusID'] || !formData['status']){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            checkOutData.cusID = formData['cusID']
            checkOutData.status = formData['status']
            await checkOutData.save()
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        listByUserID: async (req, res, next) => {
            try {
                let checkOutList = await checkOutModel.find()
                console.log(checkOutList)
                return res.status(200).json({checkOutList})
            } catch (error) {
                return res.status(400).json(error);
            }
        }
    };
}

module.exports = new checkOutController();
