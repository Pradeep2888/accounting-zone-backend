const mongoose=require("mongoose")
require("dotenv").config()

const connection=mongoose.connect('mongodb+srv://accountingszone:accountingszone@cluster0.0sar6if.mongodb.net/accountingszone?retryWrites=true&w=majority')

module.exports={connection}
