const mongoose =require('mongoose');


const db = async()=>{
   try {
    await mongoose.connect(process.env.DATABASE);
    console.log("database connected");
   } catch (error) {
    console.log("database connection problem");
   }
}
module.exports = db;