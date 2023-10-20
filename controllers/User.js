
const UserModel = require("../models/User")


async function deleteUser(req,res){
    try{
        const {id} =req.params
        UserModel.deleteOne({id}).then(response => {
            if (response.deletedCount){
                res.status(200).json({
                    message:`The document with ${id} was successfully deleted`,
                })
            }else{
                res.status(200).json({
                    message:`Document not found: ${id}`,
                })
            }
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

async function updateUser(req,res){
    try {
        const { id_user, modify }  = req.body

        await UserModel.findOneAndUpdate({ id: id_user } , modify).then(
            response => {
                if(response.id){
                    res.status(200).json({
                        message:`The document with id ${response.id} was edited successfully`,
                        data : res.body
                    })
                }else{
                    res.status(200).json({
                        message:`Document not found`,
                    })
                }
            }
        )
    }catch (error){
        res.status(400).json({ message: error.message})
    }
}


async function readUser(req,res){
    try {
        const {id} = req.params

        UserModel.findOne({id}).then(response =>
            res.status(200).json(response)
        )
    }catch (error){
        res.status(400).json({ message : error.message })
    }
}


async function readUsers(_, res) {
	try {
		await UserModel.find().then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

module.exports = {
    deleteUser,
    readUser,
    readUsers,
    updateUser,
}
