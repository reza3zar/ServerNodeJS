
const Joi=require("@hapi/joi");

const schema={
    title:Joi.string().min(4).max(20).required(),
    body:Joi.string().required(),
    userId:Joi.number().required(),
    id:Joi.number().required(),
    password:Joi.string()
    ,categorys:Joi.array()
}

const schemaAccessToPost={
    password:Joi.string().required()
}

const postValidation= (data)=>{
    return  Joi.validate(data,schema, { abortEarly: false });
}

const accessToPost= (data)=>{
    return  Joi.validate(data,schemaAccessToPost,{abortEarly:false})
}

module.exports.postValidation=postValidation;
module.exports.accessToPost=accessToPost;
