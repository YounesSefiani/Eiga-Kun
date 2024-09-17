const Joi = require("joi");

const schema = Joi.object({
  pseudo: Joi.string().min(5).max(50).required(),
  mail: Joi.string().email().required(),
  birthdate: Joi.date().required(),
  password: Joi.string().min(8).max(20).required(),
  passwordConfirmation: Joi.string().valid(Joi.ref("password")).required(),
}).with("password", "passwordConfirmation");

const userValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = userValidation;
