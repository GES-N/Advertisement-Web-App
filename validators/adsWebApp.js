import Joi from "joi";

export const validateProduct = Joi.object ({
    vendor: Joi.string().required(),
    productName: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    images: Joi.array().required(),
    stockQuantity: Joi.number().min(0).required(),
    availabilityStatus: Joi.boolean(),
  });





export const validateProductUpdate = Joi.object ({
  productName: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  price: Joi.number().positive().optional(),
  category: Joi.string().optional(),
  images: Joi.array().optional(),
  stockQuantity: Joi.number().min(0).optional(),
  availabilityStatus: Joi.boolean(),
  });
