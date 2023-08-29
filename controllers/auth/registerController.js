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
            phone_numbar: Joi.string().min(10).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        console.log(req.body);

        const { error } = registerSchema.validate(req.body);
        
        if (error) {
            return next(error);
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
            const exist = await User.exists({ phone_numbar: req.body.phone_numbar });
            if (exist) {
                return res.status(409).json({
                    status: false,
                    massage:'This Phone Numbar is already taken.'
                })
            }
        } catch(err) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }

        const { name, email, phone_numbar ,password,role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // prepare the model

    const user = new User({
        name,
        email,
        role,
        phone_numbar,
        password: hashedPassword
    });

    let access_token;

    try {
        let mailsubject = "Mail Verification";
        const randomsTring = randomstring.generate({
        length: 6,
        charset: ['numeric']
        });
        console.log(randomsTring);
        let content = ' Hello, '+name+',\n \n'+randomsTring+'';
        sendmail(req.body.email,mailsubject,content);
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
    
    res.status(200).json({ status:true,user,access_token});

    }
}


export default registerController;