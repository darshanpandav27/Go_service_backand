import Joi from 'joi';

const AdminprofileSchema = Joi.object({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
    Lat: Joi.string(),
    Log: Joi.string(),
    Compny_name: Joi.string().required(),
    image:Joi.string()
});

export default AdminprofileSchema;