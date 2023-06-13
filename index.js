const express=require("express");
const cors=require("cors")
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to api")
})

app.post("/generatemail",(req,res)=>{
    const {name,email,contact,message}=req.body
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
        from : "pradeeptiwari2666@gmail.com",
        to : email,
        subject: "Thanking Mail From estudee ",
        html: mail1
    }
    
    transporter.sendMail(mailgenerate1).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        console.log(mailgenerate1)
        return res.status(500).json({ error })
    })



    // *****Vistor information mail Sending to Company*******



    let response2 = {
        body: {
            name : "Accountings Zone",
            intro: `Name:${name} Contact:${contact} Email:${email} Message:${message}`,
        }
    }

    let mail2 = MailGenerator.generate(response2)

    let mailgenerate2 = {
        from : "acctingszone@gmail.com",
        to : "acctingszone@gmail.com",
        subject: "New visitor detail",
        html: mail2
    }

    
    transporter.sendMail(mailgenerate2).then(() => {
       console.log("mail to company sended")
    
    }).catch(error => {
        console.log(mailgenerate2)
        console.log("something went wrong")
       
    })





})




app.listen(8080,()=>{
    console.log("server Started in port 8080")
})