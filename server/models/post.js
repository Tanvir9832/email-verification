const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    status : String,
    image : String
});

module.exports = mongoose.model("Post",postSchema);