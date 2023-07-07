const express=require("express")
const { ContactUsModel } = require("../models/ContactusModel")
const contactusRoute=express.Router()
const nodemailer=require("nodemailer")
const Mailgen=require("mailgen")


contactusRoute.get("/",(req,res)=>{
    res.send({message:"welcome to contact us route"})
})

contactusRoute.post("/add",async(req,res)=>{
    const {name,email,contact,message,subject}=req.body
    const data=await ContactUsModel.findOne({email:email})
   
    let config = {

        service : 'gmail',
        auth : {
            user:"acctingszone@gmail.com",
            pass: "jbovyygqzhnxpsgx"
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Accountings Zone",
            link : 'https://accountingszone.com/'
        }
    })
    //  ******Thanking Mail Sending to visitor****
    let response1 = {
        body: {
            name : name,
            intro: "Thank you for taking the time to visit our website we will connect to you shortly",
        }
    }

    let mail1 = MailGenerator.generate(response1)

    let mailgenerate1 = {
        from : "acctingszone@gmail.com",
        to : email,
        subject: "Thanking Mail From Accountings Zone ",
        html: mail1
    }

    if(data){
        await ContactUsModel.findByIdAndUpdate({_id:data.id},{"$set":{"status":"Pending"}})
       res.send({"message":"your request is already generated we will connect you soon"})
    }
     else if(name && email && contact && message){

        const new_request=new ContactUsModel({
            name,
            email,
            contact,
            status:"Pending",
            message,
            subject:subject===undefined?"Please Try To Connect With Me":subject
            })
           
        transporter.sendMail(mailgenerate1)
        .then(async() => {
            res.send({"message1":"mail send successfully","message2":await saveData()}) 
        })
        .catch(error => {
            res.send({"message1":"mail not send successfully","message2":"data not saved successfully"}) 
           console.log(error)
        })

        const saveData=async()=>{
            
           try{
            await new_request.save()
            return "data saved successfully"
           }
           catch{(err)=>{
            console.log(err)
            return "data not saved successfully"
           }}
        }
        

    }

    else{
        res.send({"message":"Some thing went wrong please please provide all details"})
    }


})




module.exports={contactusRoute}
