import user from "../models/User";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const ForgotPassword = {
    async sendEmail(req, res, next) {
        const {email} = req.body;

        if(!email){
            return res.status(400).json({message: 'Email is required'});
        }

        const existingUser = await user.findOne({email});
        if(!existingUser){
            return res.status(404).json({message: 'No User Found'});
        }

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email}, 'sakuraBeauty', {expiresIn: '1h'});

        user.updateOne({_id: existingUser._id}, {token}, (err, result) => {
            if(err){
                return console.log(err);
            }
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const emailPort = process.env.EMAIL_PORT || '8080';

        const mailOptions = {
            from: 'sakuraBeauty@gmail.com',
            to: email,
            subject: 'Recuperar contraseña',
            html: `<h1>Recuperar contraseña</h1>
            <p>Hola ${existingUser.user},</p>
            <p>Para recuperar tu contraseña, haz click en el siguiente enlace:</p>
            <a href="http://localhost:${emailPort}/api/forgotPassword/${token}">http://localhost:${emailPort}/api/forgotPassword/${token}</a>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                return console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            
                return res.status(200).json({message: 'Email Sent'});
            }
        });
    },       
}

export default ForgotPassword;