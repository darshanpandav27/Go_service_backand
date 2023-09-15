import nodemailer from 'nodemailer';
import {SMTP_MAIL,SMTP_PASSWORD} from '../config/index.js';

const sendmail = async (email,mailsubject,content)=>{
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: SMTP_MAIL,
              pass: SMTP_PASSWORD
            }
          });
          
          const mailOptions = {
              from:SMTP_MAIL,
              to:email,
              subject: mailsubject,
                text: content
            } 
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    } catch (error) {
        console.log(error.massage);
        
    }
}

export default sendmail;