import Joi from "joi";

const validateProduct = (product) => {
  const schema = Joi.object({
    vendor: Joi.string().required(),
    productName: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    images: Joi.array().required(),
    stockQuantity: Joi.number().min(0).required(),
    availabilityStatus: Joi.boolean(),
  });
  return schema.validate(product);
};

export default validateProduct;
