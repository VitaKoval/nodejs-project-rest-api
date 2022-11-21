const Joi = require("joi");

const schemaAddContacts = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+|\d[\s\d\-\(\)]*\d$/)
    .required(),
});

const schemaUpdateContacts = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+|\d[\s\d\-\(\)]*\d$/),
}).min(1);

const schemaUpdateStatus = Joi.object({
  favorite: Joi.string().required(),
});

module.exports = {
  schemaAddContacts,
  schemaUpdateContacts,
  schemaUpdateStatus,
};
