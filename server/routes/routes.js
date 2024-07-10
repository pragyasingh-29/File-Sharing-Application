import express from "express";
import { uploadImage, downloadImage } from "../controller/image-controller.js";
import upload from '../utils/upload.js';
import nodemailer from "nodemailer";
// import {link} from "../../client/src/services/api.js"
// import  emailLink  from "../../client/src/services/api.js";


const router = express.Router();

router.post('/upload',upload.single('file'), uploadImage);

router.post('/register',(req, res)=>{

      const {email} = req.body;
      const {link2}= req.body;
      console.log(req.body.link2);
      console.log(req.body);

    try{

        const transporter = nodemailer.createTransport({
            
            service:"gmail",
            auth:{
                user:"pragyaaa.singh22@gmail.com",
                pass:"xdmz iyec gueb cxnn"
            }
        });

        const mailOptions = {
            from:"pragyaaa.singh22@gmail.com",
            to:email,
            subject:"The Download Link",
            text:"Download the File using the specified Link",
            html: `<a href="${link2}" >Click this Link</a></p>`
        }

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("Error",error);

            }
            else
            {
                console.log("email sent"+ info.response);
            }
        })
     console.log("The email of receiver and emailLink is:",email,"The link is ", link2);
   
    }
    catch(err){
    console.log(`The error is :${err}`);
    }
 });
 
router.get('/file/:fileId', downloadImage);

export default router;