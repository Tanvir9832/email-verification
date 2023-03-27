const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const User = require("../models/user")

const signUp = async(req,res)=>{
    const {userName,email,password} =req.body;
    //!try start
    try {
        //!filledup check start
    if(userName==""||email==""||password==""){
        return res.status(400).json({
            error : "Fill All The Filed"
        })
    }
        //!filledup check end

    const userEmailSearch = await User.findOne({email : email});
    const userNameSearch = await User.findOne({userName : userName});
    if(userEmailSearch) {
        return res.status(400).json({
            error : "Email already exists"
        })
    }else if(userNameSearch){
        return res.status(400).json({
            error : "Username already exists"
        })
    }else{
        const token = jwt.sign({email : email},process.env.SECRET,{
            expiresIn : '30m'
        });
        const hashedPass = await bcrypt.hash(password,12);
        const user = new User({userName,email,isVarified : false, password : hashedPass});

        const link = `http://localhost:8080/verify/${token}/${email}`;

        const transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            service : 'gmail',
            port : '587',
            secure : false,
            auth :{
                user : process.env.EMAIL,
                pass : process.env.EMAIL_PASSWORD
            }
        });
        transporter.sendMail({
        from : process.env.EMAIL,
        to : email,
        subject : `Hello ${userName}`,
        text : 'Verify Email',
        html : `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify</title>
        </head>
        <body style="box-sizing: border-box;">
            <div style="text-align: center;">
                <h1 style="font-weight: bolder;">If You Are '${userName}'</h1>
                <h3 style="font-weight: bolder; margin-top: 30px; margin-bottom: 50px;">Verify Your Email Clicking The Confirm Button</h3>
                <a href="${link}" style="text-decoration: none; padding: 10px 30px; border-radius: 5px; background-color: aquamarine;">Confirm</a>
            </div>
        </body>
        </html>`
        },(error,info)=>{
            if(error){
                res.status(400).json({
                    error : "Verification email not sent"
                })
            }else{
                res.status(200).json({
                    message : "Verification email sent"
                })
            }
        })
        await user.save();
    }
     }
     //!try end

     //!catch start
      catch (error) {
        console.log(error);
        return res.status(400).json({
            error : "Sign Up Failed"
        })
    }
    
}


module.exports = signUp;