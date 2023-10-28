import serviceSchema from "../validators/service";
import addserviceSchema from "../validators/addservice";
import { service , addsevice} from "../models";
import user from "../models/user";
import mongoose from 'mongoose';


const serviceController = {
    async service(req, res, next) {

        const { error } = serviceSchema.validate(req.body);

        if (error) {
            return res.status(500).json({
                status: false,
                massage: error
            })
        }
        let document;

        try {
            document = await service.create(
                {
                    sevice_type: req.body.sevice_type,
                    sevice_type_name: req.body.sevice_type_name,
                    price: req.body.price
                }
            );
        } catch (err) {
            return res.status(500).json({
                status: false,
                massage: err
            });
        }
        console.log(document);
            res.status(200).json({
                status: true,
                data: document,
                massage:"successfully created..."
            });
    },
    async allservice(req, res, next) {
        try {
            const servicedata = await service.find({sevice_type: req.body.sevice_type}).select('-password -updatedAt -__v');
            if (!servicedata) {
                return res.status(400).json({
                    status: false,
                    massage:"404 Not Found"
                });
            }
            res.status(200).json({
                status:true,
               data: servicedata,
               massage:"successfully"
            })
        } catch(err) {
           return next(err);
        }
    },
    async addservice(req, res, next) {

        const { error } = addserviceSchema.validate(req.body);

        if (error) {
            return res.status(500).json({
                status: false,
                massage: error
            })
        }

        const { admin_name, sevice_type,sevice_type_name,price,author} = req.body;

        let exiteduser;

        try {
            exiteduser = await user.findById(author);
        } catch (error) {
            return console.log(error)
        }
        if(!exiteduser){
            return res.status(400).json({message:"User is not exited!!!"})
        }

        let sevicedata;

        sevicedata = await addsevice(
            {
                admin_name,
                sevice_type,
                sevice_type_name,
                price,
                author
            }
        ).select('-updatedAt -__v');;
        const session = await mongoose.startSession();
        session.startTransaction();
        let data  = await sevicedata.save({session});
        console.log(data);
        exiteduser.sevice_id.push(sevicedata);
        await exiteduser.save({session})
        await session.commitTransaction();

        
        console.log(sevicedata);
            res.status(200).json({
                status: true,
                data: sevicedata,
                massage:"successfully..."
            });
    },
};

export default serviceController;