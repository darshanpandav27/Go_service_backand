import { json } from 'express';
import Joi from 'joi';

const addserviceSchema = Joi.object({
    
    name: Joi.string().required(),
    sevice_type: Joi.string().required(),
    sevice_type_name: Joi.string().required(),
    price: Joi.string().required(),
    author:Joi.string().required()
});

export default addserviceSchema;