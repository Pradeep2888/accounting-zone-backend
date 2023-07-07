const { timeStamp } = require("console")
const mongoose=require("mongoose")


const ContactUsSchemia=new mongoose.Schema({
    "name":{type:String,required:true},
    "email":{type:String,required:true},
    "contact":{type:String,required:true},
    "subject":{type:String},
    "status":{type:String},
    "message":{type:String,required:true}
},{
    timeStamp:true
})

const ContactUsModel=mongoose.model("contactus",ContactUsSchemia)

module.exports={ContactUsModel}