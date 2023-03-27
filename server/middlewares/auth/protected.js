const jwt = require("jsonwebtoken");

const protected = (req,res,next)=>{
    const {authorization} = req.headers;
    console.log(authorization);
    console.log(req.headers);
    try{
        const token = authorization.split(" ")[1];
        const decodeToken = jwt.verify(token,process.env.SECRET);
        const {_id} = decodeToken;
        req.id = _id;
        next();
    }catch(err){
        next("Authentication Failure");
    }
}
module.exports = protected;