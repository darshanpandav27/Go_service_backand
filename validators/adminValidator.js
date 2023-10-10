import Joi from 'joi';

const AdminprofileSchema = Joi.object({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
    Lat: Joi.string().required(),
    Log: Joi.string().required(),
    Compny_name: Joi.string().required(),
    image:Joi.string()
});

export default AdminprofileSchema;