//!packages require
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookeiParser = require('cookie-parser');


//!madeFile require
const db = require("./db/db");
const router =require("./routers/routers");

//!app
const app = express();
exports.app;


//!set
mongoose.set('strictQuery', false);
app.use(express.json());
app.use(cors());
app.use("/",router);
app.use(cookeiParser());


//!database
db();

app.get("/",(req,res)=>{
    res.send("Hello");
});

//!ErrorHandle
app.use((req,res,next)=>{
    next("Couldnot Found The Route");
});

app.use((err,req,res,next)=>{
    if(err.message){
        res.status(400).json({
            error : err.message
        })  
    }else{
        res.status(400).json({
            error : err
        })
    }
});

//!server run
app.listen(process.env.PORT || 4000,()=>{
    console.log("started");
})