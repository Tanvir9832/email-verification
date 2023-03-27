const User = require("../models/user");

const getAllUser =async(req,res)=>{
    console.log(req.id);
    try {
        const users = await User.find({});
        res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message : "users didnot found"
        })
    }
}
module.exports = getAllUser;