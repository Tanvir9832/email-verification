const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const forgetPass =async(req,res,next)=>{

    const {email} =req.body;
    try {
        // console.log(email);
        const isUser = await User.find({email : email});
        // console.log(isUser);
        if(isUser && isUser.length >0){
            //token generate
            const token = jwt.sign({ID : isUser._id} ,process.env.SECRET,{
                expiresIn : "5m"
            });
            const link = `http://localhost:3000/user/reset/${isUser[0]._id}/${token}`;

            //email sending
            // console.log(testAccount);
            // console.log(testAccount.user);
            // console.log(testAccount.pass);

            const transporter = nodemailer.createTransport({
                host : "smtp.gmail.com" ,
                service : 'gmail',
                port : 587,
                secure : false,
                auth : {
                    user : process.env.EMAIL,
                    pass : process.env.EMAIL_PASSWORD
                }
            });
            transporter.sendMail({
                from : process.env.EMAIL,
                to : email,
                subject : `${isUser[0].userName.toUpperCase()} Reset your password `,
                text: "Hello world",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Reset Password</title>
                </head>
                <body style="box-sizing: border-box;">
                    <div style="text-align: center; background-color: rgba(213, 143, 191, 0.954);padding: 35px 0px ; ">
                            <h1>HELLO ${isUser[0].userName.toUpperCase()}</h1>
                            <h2 style="color: rgb(0, 0, 0);">Reset Your Password</h2>
                        <div>
                            <h4 style="color:rgb(0, 0, 0);">You have 5 minutes</h4>
                            <p style="color: rgb(0, 0, 0)">
                                Click the Reset button to change your old password and get a new Password
                            </p>
                        </div>
                        <a href="${link}" style= "color: black; text-decoration: none ;background-color: rgb(144, 238, 210); padding: 5px 25px; border: 1px solid black; border-radius: 2px; cursor: pointer;  ">Reset</a>
                    </div>
                </body>
                </html>`
            },(err,info)=>{
                if(err){
                    console.log(err);
                    res.status(400).json({
                        error : err || err.message
                    })
                }else{
                    return res.status(200).json({
                        message : "email sent"
                    })
                }
            })

        }else{
            res.status(400).json({
                error : "Invalid Email"
            })
        }
    } catch (error) {
        res.status(400).json({
            error : error.message || error
        })
    }

}
module.exports = forgetPass;