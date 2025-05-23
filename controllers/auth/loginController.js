import Joi from 'joi';
import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService.js';
import sendPushNotification from '../../services/pushnotifiction.js';

const loginController = {
    async login(req, res, next) {
        // Validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(409).json({
                    status: false,
                    massage:'Username or password is wrong!'
                })
            }
            // compare the password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return res.status(409).json({
                    status: false,
                    massage:'Username or password is wrong!'
                })
            }

            // Toekn
            const access_token = JwtService.sign({ _id: user._id });

        // database whitelist
        // const randomsTring = randomstring.generate({
        //     length: 6,
        //     charset: ['numeric']
        //     });
        //     console.log(randomsTring);
        //     let content = ' Hello, '+name+',\n \n'+randomsTring+'';
        //     sendmail(req.body.email,mailsubject,content);
            // sendPushNotification(user._id,"hello user Good Morning...");
            res.status(200).json({ status: true,user ,access_token, massage:"Login Successful" });

        } catch(err) {
            return res.status(500).json({
                status: false,
                massage: err
            })
        }

    },
};


export default loginController;