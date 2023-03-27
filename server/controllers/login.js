const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const login = async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await User.find({email : email});
        if(user && user[0]){
            const passvarify = await bcrypt.compare(password,user[0].password);
            if(user[0].isVarified){
                if(passvarify){
                    const token = jwt.sign({ _id : user[0]._id }, process.env.SECRET ,{expiresIn : "1d"});
    
                        res.cookie("token",token,{
                            httpOnly:true,
                        });
                        res.status(200).json({
                            token : token,
                            message : "Log In Successful"
                        })
                }
                else{
                    res.status(400).json({
                        error : "User Not Found"
                    })
                }
            }else{
                res.status(400).json({
                    error : "Verification Panding..."
                })
            }

        }else{
        res.status(400).json({
            error : "User Not Found"
        }) 
        }

        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error : "Log in failed"
        })
    }
}

module.exports = login;