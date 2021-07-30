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
    res.status(404).json({ err: error.message });
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
    res.status(404).json({ err: error.message });
  } else {
    next();
  }
};

module.exports.changePasswordValidationData = (req, res, next) => {
  if (req.body.oldPassword == req.body.newPassword) {
    res.status(405).json({ err: "both password same" });
    return;
  }
  const changePasswordValidation = Joi.object({
    oldPassword: Joi.string().required().escapeHTML(),
    newPassword: Joi.string().required().min(4).max(20).escapeHTML(),
  });
  const { error } = changePasswordValidation.validate(req.body);
  if (error) {
    res.status(404).json({ err: error.message });
  } else {
    next();
  }
};

module.exports.forgetasswordValidationData = (req, res, next) => {
  const forgetasswordValidation = Joi.object({
    email: Joi.string().required().escapeHTML(),
    passwordKey: Joi.string().required().escapeHTML(),
    newPassword: Joi.string().required().min(4).max(20).escapeHTML(),
  });
  const { error } = forgetasswordValidation.validate(req.body);
  if (error) {
    res.status(404).json({ err: error.message });
  } else {
    next();
  }
};

module.exports.authBusinessValidation = (req, res, next) => {
  const authValidation = Joi.object({
    email: Joi.string().required().escapeHTML(),
    password: Joi.string().required().min(7).max(20).escapeHTML(),
    phonenumber: Joi.string().length(10).required().escapeHTML(),
  });
  const { error } = authValidation.validate(req.body);
  if (error) {
    res.status(404).json({ err: error.message });
  } else {
    next();
  }
};

module.exports.logInBusinessValidation = (req, res, next) => {
  const logInValidation = Joi.object({
    email: Joi.string().required().escapeHTML(),
    password: Joi.string().required().min(4).max(20).escapeHTML(),
    phonenumber: Joi.string().length(10).required().escapeHTML(),
  });
  const { error } = logInValidation.validate(req.body);
  if (error) {
    res.status(404).json({ err: error.message });
  } else {
    next();
  }
};
