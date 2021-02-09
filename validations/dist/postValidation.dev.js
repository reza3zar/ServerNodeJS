"use strict";

var Joi = require("@hapi/joi");

var schema = {
  title: Joi.string().min(4).max(20).required(),
  body: Joi.string().required(),
  userId: Joi.number().required(),
  id: Joi.number().required(),
  password: Joi.string(),
  categorys: Joi.array()
};
var schemaAccessToPost = {
  password: Joi.string().required()
};

var postValidation = function postValidation(data) {
  return Joi.validate(data, schema, {
    abortEarly: false
  });
};

var accessToPost = function accessToPost(data) {
  return Joi.validate(data, schemaAccessToPost, {
    abortEarly: false
  });
};

module.exports.postValidation = postValidation;
module.exports.accessToPost = accessToPost;