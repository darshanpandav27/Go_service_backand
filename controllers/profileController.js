import { User } from "../models/index.js";
import multer from "multer";
import CustomErrorHandler from '../services/CustomErrorHandler.js';
import path from 'path';
import fs from 'fs';
import profileSchema from '../validators/profileValidator.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
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
                return res.status(500).json({
                    status: false,
                    massage: 'Internal server error'
                });
            }
            const filePath = req.file.path;
            console.log(`=====>>>>>${req.file.path}`);
            console.log(`=====>>>>>${filePath}`);
            // validation

            const { error } = profileSchema.validate(req.body);

             if(error){
                fs.unlink(`${appRoot}/${filePath}`,(err)=>{
                    // console.log(err.message);
                        return res.status(500).json({
                            status: false,
                            massage: 'Internal server error'
                        });
                });
                return res.status(500).json({
                    status: false,
                    massage: error
                });
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
                console.log(document.image);
                if (!document) {
                    return res.status(400).json({
                        status: false,
                        massage:"404 Not Found"
                    });
                }
            } catch (err) {
                return res.status(500).json({
                    status: false,
                    massage: err
                });
            }
            console.log(document);
            res.status(200).json({
                status: true,
                data:document,
                massage:"successfully created..."
            });
        });
    },
    update(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    massage: 'Internal server error'
                });
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
                         return res.status(500).json({
                            status: false,
                            massage: 'Internal server error'
                        });
                });
                return res.status(500).json({
                    status: false,
                    massage: error
                });
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
            res.status(200).json({
                status: true,
                data:document,
                massage:"Update successfully"
            });
        });
    }
}

export default profileController;