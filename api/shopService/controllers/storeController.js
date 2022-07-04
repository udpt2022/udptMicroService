const storeModel = require('../models/storeModel')

function storeController() {
    const SELF = {
    };
    return {
        registerStore: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                let storeData = new storeModel;
                if (!formData['storeName'] || !formData['phone'] || !formData['email']){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            storeData.storeName = formData['storeName'];
            storeData.phone = formData['phone'];
            storeData.email = formData['email'];
            storeData.storeAddress.area = formData['area']
            storeData.storeAddress.province = formData['province']
            storeData.storeAddress.district = formData['district']
            storeData.storeAddress.address = formData['address']
            storeData.status = "Wait for confirmation";
            await storeData.save();
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        getStatusRegisterStore: async (req,res,next) => {
            try {
                let shopID = req.params.id
                console.log(shopID)
                let status = await storeModel.find({_id: shopID}).project({status: 1})
                return res.status(200).json({status})
                } catch (error) {
                return res.status(400).json(error);
                }
        }
    };
}

module.exports = new storeController();
