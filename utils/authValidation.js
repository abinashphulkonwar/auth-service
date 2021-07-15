const baseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = baseJoi.extend(extension);

module.exports.authValidationData = (req, res, next) => {
  const authValidation = Joi.object({
    email: Joi.string().required().escapeHTML(),
    password: Joi.string().required().min(7).max(20).escapeHTML(),
  });
  const { error } = authValidation.validate(req.body);
  if (error) {
    res.status(404).json(error.message);
  } else {
    next();
  }
};

module.exports.logInValidationData = (req, res, next) => {
  const logInValidation = Joi.object({
    email: Joi.string().required().escapeHTML(),
    password: Joi.string().required().min(4).max(20).escapeHTML(),
  });
  const { error } = logInValidation.validate(req.body);
  if (error) {
    res.status(404).json(error.message);
  } else {
    next();
  }
};
