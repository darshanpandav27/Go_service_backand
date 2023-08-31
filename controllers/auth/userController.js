import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import aboutSchema from '../../validators/about';

const userController = {
    async me(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -updatedAt -__v');
            if (!user) {
                returnres.status(400).json({
                    status: false,
                    massage:"404 Not Found"
                });
            }
            res.status(200).json({
                status:true,
               data: user,
               massage:"successfully"
            })
        } catch(err) {
           return next(err);
        }
    },
    async about(req,res,next){
        res.status(200).json({
            status:true,
           data: aboutSchema,
           massage:"successfully"
        })
    }
};

export default userController;