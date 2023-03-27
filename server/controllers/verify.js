const User = require("../models/user");

const verify =async(req,res)=>{
    const {token , email} =req.params;
    if(token){
        const user = await User.find({email : email});
        const newUser = await User.find({_id : user[0]._id });
        console.log(newUser);
        await User.findByIdAndUpdate(user[0]._id,{
            isVarified : true ,
            $unset: { expireAt: "" }
        })
        
        res.send(`successfull`);
    }else{
        res.send(`token expired`)
    }
}
module.exports = verify;