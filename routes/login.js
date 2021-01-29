const express=require('express');
const router=express.Router();
router.use(express.json());
const bcryptjs=require('bcryptjs');

const {loginValidation}=require('../validations/loginInfo');
const {registerValidation}=require('../validations/registerValidation');

const login=require('../models/loginInfo');
const jsonwebtoken=require('jsonwebtoken');

const {generateCryptData}=require('../utilities/cryptoHandler');
 



router.post('/',async (req,res)=>{
    try {
        const loginValidationResult= loginValidation(req.body);

        if(loginValidationResult && loginValidationResult.error) return res.status(400).send(loginValidationResult);
        console.log('1')

        const findLoginInformation= await login.findOne({userName:req.body.userName});
        console.log('2')

        if(!findLoginInformation) return res.status(400).send({errorMessage:'User not found!!!'});
       

        const isCorrectPassword=await bcryptjs.compare(req.body.password,findLoginInformation.password);

        if(!isCorrectPassword) return res.status(400).send({errorMessage:'userName/password is invalid !!!'});

        const jwt=jsonwebtoken.sign ({_id:findLoginInformation._id,
            email:findLoginInformation.email,expireDate:Date.now
             
        },process.env.TOKEN_ENCRYPT);

        return res.header('auth-token',jwt).send({email:findLoginInformation.email})
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/register',async (req,res)=>{
    try {
        const registerValidationResult= registerValidation(req.body);
        

        if(registerValidationResult && registerValidationResult.error) return res.status(400).send(registerValidationResult);

        const findLoginInformation= await login.findOne({userName:req.body.userName});
        if(findLoginInformation) return res.status(400).send({errorMessage:'User is already exist !!!'});

        let cryptoPassword=await generateCryptData (req.body.password);

        const newUserInformation=new login({
            email:req.body.email,
            userName:req.body.userName,
            password:cryptoPassword,

        })
        console.log(newUserInformation)

        const registerUserInformation=await  newUserInformation.save();
        return res.send({_id:registerUserInformation._id})


    } catch (error) {
        
    }
});

module.exports=router