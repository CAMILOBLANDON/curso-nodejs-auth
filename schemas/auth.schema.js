const Joi = require('joi');

const token = Joi.string();
const password = Joi.string().min(8);

const chagePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: password.required(),
});

module.exports = { chagePasswordSchema };
