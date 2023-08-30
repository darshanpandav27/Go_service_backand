import { User } from "../models";
import multer from "multer";
import CustomErrorHandler from '../services/CustomErrorHandler';
import path from 'path';
import fs from 'fs';
import profileSchema from '../validators/profileValidator';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single('image'); // 5mb


const profileController = {
    async profile(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            const filePath = req.file.path;
            // validation

            const { error } = profileSchema.validate(req.body);

             if(error){
                fs.unlink(`${appRoot}/${filePath}`,(err)=>{
                    // console.log(err.message);
                        return next(
                            CustomErrorHandler.serverError(err.message)
                        );
                });
                return next(error);
             }


            const { name, email, address, Gender,phone_number} = req.body;

            let document;
            try {
                document = await User.findOneAndUpdate(
                    {_id: req.params.id},
                    {name,
                    email,
                    phone_number,
                    address,
                    Gender,
                    image: filePath},
                    {new : true}
                );
                if (!document) {
                    return next(CustomErrorHandler.notFound());
                }
            } catch (err) {
                return next(err);
            }
            console.log(document);
            res.status(201).json({
                status: true,
                data:document,
                massage:"successfully"
            });
        });
    },
    update(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            let filePath;
            if (req.file) {
                filePath = req.file.path;
            }
            // validation

            const { error } = profileSchema.validate(req.body);

             if(error){
                fs.unlink(`${appRoot}/${filePath}`,(err)=>{
                    // console.log(err.message);
                        return next(
                            CustomErrorHandler.serverError(err.message)
                        );
                });
                return next(error);
             }


            const { name, email, address, Gender,phone_number} = req.body;

            let document;
            try {
                document = await User.findOneAndUpdate(
                    {_id: req.params.id},
                    {name,
                    email,
                    phone_number,
                    address,
                    Gender,
                    ...(req.file && { image: filePath })},
                    { new : true}
                ).select('-password -updatedAt -__v');
                if (!document) {
                    return next(CustomErrorHandler.notFound());
                }
            } catch (err) {
                return next(err).json({
                    status: false,
                    massage:err
                });
            }
            res.status(201).json({
                status: true,
                data:document,
                massage:"successfully"
            });
        });
    }
}

export default profileController;