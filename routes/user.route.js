const express=require("express")
const { ContactUsModel } = require("../models/ContactusModel")
const userRoute=express.Router()
const jwt = require('jsonwebtoken');


userRoute.get("/",(req,res)=>{
    res.send({"message":"welcome to user route"})
})


userRoute.get("/update",(req,res)=>{
    res.send({"message":"welcome to user route"})
})

userRoute.get("/data",async(req,res)=>{
    try{
        const data= await ContactUsModel.find()
        res.send({"message":"api hit successfully","data":data})
    }
    catch{(err)=>{
        console.log(err)
        res.send({"message":"Api Result is unsuccessfull please try again"})
    }}
})
userRoute.post("/login",async(req,res)=>{
   const {email,password}=req.body
  
   if(email==="admin@accountingszone.com" && password==="Accountings@#123"){
       const user_detail={type:"admin",secret_key:9015231578}
       const token = jwt.sign({ user_detail }, "ABC123ACCOUNTINGZONE");
       res.send({ "mesg": "Login sucessfull", "token": token })
   }
   else{
    res.send({"message":"Please Provide Correct Email and Password"})
   }

})





module.exports={userRoute}