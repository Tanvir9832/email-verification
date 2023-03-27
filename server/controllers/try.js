
const nodemailer = require("nodemailer");

const demo = async(req,res)=>{
    const {email} = req.body;
    try {
        if(email){
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
                subject : 'TEST',
                text: "Hello world",
                html: "<b>Hello Tanvir</b>"
            },(err,info)=>{
                if(err){
                    res.status(400).json({
                        error : err
                    })
                }else{
                    res.status(200).json({
                        message : "email sent"
                    })
                }
            })
        }else{
            res.status(400).json({
                error : error
            }) 
        }
    } catch (error) {
            res.status(400).json({
                error : error
            })
    }
}

module.exports = demo;