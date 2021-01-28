
const Joi=require("@hapi/joi");

const schema={
        userName:Joi.string().min(4).max(30),
        password:Joi.string().min(6).max(20)
}

 

const loginValidation= (data)=>{
    return  Joi.validate(data,schema, { abortEarly: false });
}

 

module.exports.loginValidation=loginValidation;
 
