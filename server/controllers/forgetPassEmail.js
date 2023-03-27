const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const forgetPassEmail =async(req,res)=>{
    const {newPassword,confirmPassword} = req.body;
    const {id ,token} = req.params;
    console.log(id,token,newPassword,confirmPassword);
    try {
        if(newPassword && confirmPassword && id && token){
           const isTokenTrue = jwt.verify(token , process.env.SECRET);
           if(isTokenTrue){
            if(newPassword===confirmPassword){
                const hashedPassword = await bcrypt.hash(newPassword,12);
                const user = await User.findByIdAndUpdate(id,{
                    password : hashedPassword
                })
                res.status(200).json({
                    message : "Password Changed"
                })

            }else{
                res.status(400).json({
                    error : "New pasword and confirm password should be same"
                })
            }
           }else{
            res.status(400).json({
                error : "Link Expired"
            })
           }
        }else{
            res.status(400).json({
                error : "Fill Both The Field"
            })
        }
    } catch (error) {
        
    }
}

module.exports = forgetPassEmail;