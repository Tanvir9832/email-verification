const bcrypt = require("bcryptjs");
const User =require("../models/user");


const changePass = async(req,res)=>{
    const {newPass,confirmPass} = req.body;
    try {
        if(newPass && confirmPass){
            if(!(newPass === confirmPass)){
            res.status(400).json({
                error : "New Password And Confirm Password Should Be Same"
            })
            }else{
                const hashedPassword = await bcrypt.hash(newPass,10);
                const user = await User.findByIdAndUpdate(req.id,{
                    password : hashedPassword,
                });
                res.status(200).json({
                    message : "Password Changed",
                })
            }
        }else{

            res.status(400).json({
                error : "Fill Both Password Field"
            })
        }
        
    } catch (error) {
        
    }
}

module.exports = changePass;