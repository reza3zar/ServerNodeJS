const express=require('express');
const router=express.Router();
const Post=require('../models/post')
router.use(express.json());

const {postValidation,accessToPost} = require('../validations/postValidation');

const bcrypyjs=require('bcryptjs');

const {generateCryptData}=require('../utilities/cryptoHandler')
const authInterceptor=require('../interceptore/authInterceptor')
// const {postValidation}=require('../validations/postValidation')
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });




// router.use((req,res,next)=>{
//     next();
// })
 
router.get('/', authInterceptor ,async (req,res)=>{
    try {
        const postCollection=await Post.find();
        res.json({result:postCollection});
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
});

router.get('/:postId', async (req,res)=>{
    try {
        const accessToThePost=  accessToPost(req.body);
        if (accessToThePost && accessToThePost.error) return res.status(400).send({errorMessage:'Access Denied!!!'});

        const postItem=await Post.findById(req.params.postId);
        if(!postItem) return res.status(400).send('post not find!');


        const isValidPassword=await bcrypyjs.compare(req.body.password,postItem.password);
        if(!isValidPassword) return res.status(400).send({errorMessage:'password is wrong!!!'});

        res.json({result:postItem})
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
});

router.delete('/:postId', async (req,res)=>{
    try {
       const deleteItem=await Post.deleteOne({_id:req.params.postId})
        res.json({result:deleteItem})
    } catch (error) {
        res.json({message:error})
    }
});

router.patch('/:postId', async (req,res)=>{
    try {
       const updateItem=await Post.updateOne({_id:req.params.postId},{$set:{title:req.body.title}})
        res.json({result:updateItem})
    } catch (error) {
        res.json({message:error})
    }
});

router.post('/', async (req,res)=>{
     const validationResult = postValidation(req.body);
     if(validationResult && validationResult.error) return res.status(400).send(validationResult) 
     
      const postInDB=await Post.findOne({title:req.body.title});
      if(postInDB ) return res.status(400).send({errorMessage:"you cannot create this post because it is exist in DB!!!"})

      console.log(generateCryptData)
      let passwordOfPost=await generateCryptData(req.body.password);
        const postInstance=new Post({
            id:req.body.id,
            userId:req.body.userId,
            title:req.body.title,
            body:req.body.body,
            password:  passwordOfPost
        });

        try {
            const savePost= await postInstance.save();
            res.json({post:{
                title:savePost.title,
                body:savePost.body,
                _id:savePost._id
            }});
        } catch (error) {
                res.status(400).send(error)
        }

 });

module.exports=router;

