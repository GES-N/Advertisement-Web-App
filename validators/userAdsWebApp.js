import Joi from 'joi'

export const registerUserValidator = Joi.object({
    username : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required(),
    role: Joi.string().required().valid('user', 'vendor', 'admin'),
    confirmPassword : Joi.ref('password'),
    website: Joi.string().optional(),
    phone: Joi.string().optional(),
    contactName:Joi.string().optional(),
    businessAddress: Joi.string().optional(),
    uploadLogo:Joi.string().optional(),

}).with('password', 'confirmPassword');

export const loginUserValidator = Joi.object({
    username : Joi.string().optional(),
    email : Joi.string().required(),
    password : Joi.string().required(),
});

export const updateUserValidator = Joi.object({
    role:Joi.string().valid('user',  'vendor','admin').required(),
        
    });
