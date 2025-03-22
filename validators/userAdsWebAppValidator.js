import Joi from 'joi';


export const registerValidator = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    confrimPassword:Joi.ref('password'),
}).with('password', 'confirmPassword');



export const loginValidator = Joi.object({
    username:Joi.string().optional(),
    email:Joi.string().optional(),
    password:Joi.string().required(),
})
