"use strict";

var Joi = require("@hapi/joi");

var schema = {
  email: Joi.string(),
  userName: Joi.string().min(4).max(30),
  password: Joi.string().min(6).max(20),
  categorys: Joi.array()
};

var registerValidation = function registerValidation(data) {
  return Joi.validate(data, schema, {
    abortEarly: false
  });
};

module.exports.registerValidation = registerValidation;