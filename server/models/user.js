const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        trim : true
    },
    email : {
        type : String,
    },
    password : {
        type : String
    },
    
    profile : String,
    isVarified : Boolean,
    expireAt: {
        type: Date,
        expires: '1h',
        default: Date.now
    }
});

module.exports = mongoose.model("User",userSchema);