import Joi from 'joi';

const serviceSchema = Joi.object({
    sevice_type: Joi.string().required(),
    sevice_type_name: Joi.string().required(),
    price: Joi.string().required(),
    gst: Joi.string().required(),
});

export default serviceSchema;