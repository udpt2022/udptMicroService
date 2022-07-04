const storeModel = require('../models/storeModel')

function adminController() {
    const SELF = {
    };
    return {
        acceptRegisterStore: async (req,res,next) => {
            try {
                let shopID = req.params.id
                console.log(shopID)
                let status = await storeModel.findOneAndUpdate(
                    {_id: shopID
                    },
                    {
                        $set: {
                            status: "Confirmation"
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
        activateRegisterStore: async (req,res,next) => {
            try {
                let shopID = req.params.id
                console.log(shopID)
                let status = await storeModel.findOneAndUpdate(
                    {_id: shopID
                    },
                    {
                        $set: {
                            status: "Active"
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
        sendMailContractStore: async (req,res,next) => {
            
        },
    };
}

module.exports = new adminController();
