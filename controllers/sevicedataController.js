import serviceSchema from "../validators/service";
import { service } from "../models";


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
};

export default serviceController;