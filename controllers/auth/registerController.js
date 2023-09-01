import Joi from "joi";
import { User } from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import randomstring from 'randomstring';
import sendmail from '../../services/Otpsending';

const registerController = {
    async register(req, res, next) {

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            role: Joi.string(),
            phone_number: Joi.string().min(10).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        console.log(req.body);

        const { error } = registerSchema.validate(req.body);
        
        if (error) {
            return res.status(500).json({
                status: false,
                massage: error
            })
        }

        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return res.status(409).json({
                    status: false,
                    massage:'This email is already taken.'
                })
            }
        } catch(err) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }

        try {
            const exist = await User.exists({ phone_number: req.body.phone_number });
            if (exist) {
                return res.status(409).json({
                    status: false,
                    massage:'This Phone Number is already taken.'
                })
            }
        } catch(err) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }

        const { name, email, phone_number ,password,role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // prepare the model

    const user = new User({
        name,
        email,
        role,
        phone_number,
        password: hashedPassword
    });

    let access_token;

    try {
        // let mailsubject = "Mail Verification";
        // const randomsTring = randomstring.generate({
        // length: 6,
        // charset: ['numeric']
        // });
        // console.log(randomsTring);
        // let content = ' Hello, '+name+',\n \n'+randomsTring+'';
        // sendmail(req.body.email,mailsubject,content);
        const result = await user.save();
        console.log(result);
        // Token
        access_token = JwtService.sign({ _id: result._id, role: result.role });
        // database whitelist
    } catch(err) {
        return res.status(500).json({
            status: false,
            massage: err
        })
    }
    
    res.status(200).json({ status:true,user,access_token,massage:"login successful... "});

    },
    async otp(req,res,next){
        
        const otpSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required()
        });

        console.log(req.body);

        const { error } = otpSchema.validate(req.body);

        if (error) {
            return res.status(500).json({
                status: false,
                massage: error
            })
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(409).json({
                    status: false,
                    massage:'Email is wrong !'
                })
            }
        } catch(err) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }

        try {
            let mailsubject = "Mail Verification";
            const otp = randomstring.generate({
            length: 6,
            charset: ['numeric']
            });
            console.log(otp);
            let content = ' Hello, '+req.body.name+',\n \n'+otp+'';
            sendmail(req.body.email,mailsubject,content);
            const user = await User.findOneAndUpdate({ _id: req.user._id }, {otp});
            if (!user) {
                returnres.status(400).json({
                    status: false,
                    massage:"404 Not Found"
                });
            }
            const result = await user.save();
            console.log(result);
            res.status(200).json({ status:true,otp,massage:"Otp Sending...."});
            // Token
            // database whitelist
        } catch(err) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }
        
        
    },
    async otpverified(req,res,next){

        const otpverifiedSchema = Joi.object({
            otp: Joi.string().min(6).required(),
        });

        console.log(req.body);

        const { error } = otpverifiedSchema.validate(req.body);

        if (error) {
            return res.status(500).json({
                status: false,
                massage: error
            })
        }

        try {
            const user = await User.findOne({ _id: req.user._id })
            if (!user) {
                return res.status(400).json({
                    status: false,
                    massage:"404 Not Found"
                });
            }
            if(req.body.otp === user.otp){
                res.status(200).json({
                    status:true,
                   massage:"successfully"
                })
            }else{
                return res.status(409).json({
                    status: false,
                    massage:'Otp is wrong! please try again'
                })
            }
        } catch(err) {
           return next(err);
        }
    },
    async Reotpverified(req,res,next){
        const otpSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required()
        });

        console.log(req.body);

        const { error } = otpSchema.validate(req.body);

        if (error) {
            return res.status(500).json({
                status: false,
                massage: error
            })
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(409).json({
                    status: false,
                    massage:'Email is wrong !'
                })
            }
        } catch(err) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }

        try {
            let mailsubject = "Mail Verification";
            const otp = randomstring.generate({
            length: 6,
            charset: ['numeric']
            });
            console.log(otp);
            let content = ' Hello, '+req.body.name+',\n \n'+otp+'';
            sendmail(req.body.email,mailsubject,content);
            const user = await User.findOneAndUpdate({ _id: req.user._id }, {otp},{new : true});
            if (!user) {
                returnres.status(400).json({
                    status: false,
                    massage:"404 Not Found"
                });
            }
            const result = await user.save();
            console.log(result);
            res.status(200).json({ status:true,otp,massage:"Otp Sending...."});
            // Token
            // database whitelist
        } catch(err) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }
        
        
    },
}


export default registerController;1