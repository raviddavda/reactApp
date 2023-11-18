import Joi from "joi";
import validation from "./validation";

const cardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().min(9).max(11).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "This field is required",
      "string.email": "Must be a valid email",
      "string.min": "Must be a valid email",
    })
    .min(5)
    .required(),
  web: Joi.string().min(14).allow(""),
  image: Joi.object({
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  address: Joi.object({
    state: Joi.string().allow(""),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().allow(""),
  }),
});

const validateCard = (inputToCheck) =>
  // cardSchema.validate(inputToCheck, { abortEarly: false });
  validation(cardSchema, inputToCheck);

export { validateCard };
