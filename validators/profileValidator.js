import Joi from 'joi';

const profileSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
    Gender: Joi.string().required(),
    image:Joi.string()
});

export default profileSchema;