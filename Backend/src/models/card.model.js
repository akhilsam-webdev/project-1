const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    title:String,
    description:String,
    
})

const cardModel = mongoose.model("cards",cardSchema)

module.exports= cardModel