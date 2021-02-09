const express=require('express');
const router=express.Router();
const Post=require('../models/post')
router.use(express.json());
const {postValidation} = require('../validations/postValidation');

const bcrypyjs=require('bcryptjs');

const {generateCryptData}=require('../utilities/cryptoHandler')
const authInterceptor=require('../interceptore/authInterceptor');
const { Mongoose } = require('mongoose');
const category = require('../models/category');
 
//multer
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './post-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
  });

  function fileFilter (req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    try {
        console.log(file.mimetype)
        if(file.mimetype==='image/jpeg')
            // To accept the file pass `true`, like so:
            cb(null, true);
        else
            // To reject this file pass `false`, like so:
            cb(new Error('file format is not jpeg !!!'), false);
    } catch (error) {
        // You can always pass an error if something goes wrong:
        cb(new Error('fileFilter multer has an error'))
    }
   
  }

  var upload = multer({ storage: storage, limits:{
      fileSize:1024*1024*4
  },fileFilter:fileFilter })
 
 
router.get('/', authInterceptor ,async (req,res)=>{
    try {
        const postCollection=await Post.find()
        // populate('Category'). // only works if we pushed refs to children
        // exec(function (err, person) {
        //   if (err) return handleError(err);
        //   console.log(person);
        // });
       // console.log(postCollection)
        res.json({result:postCollection});
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
});

router.get('/:postId', async (req,res)=>{
    try {
        // const accessToThePost=  accessToPost(req.body);
        // if (accessToThePost && accessToThePost.error) return res.status(400).send({errorMessage:'Access Denied!!!'});

        const postItem=await Post.findById(req.params.postId);
        if(!postItem) return res.status(400).send('post not find!');
        let categoryCollection=null;
        if(postItem.categorys){
          categoryCollection= await  category.find({  _id: { $in: postItem.categorys }});
        }
        // const isValidPassword=await bcrypyjs.compare(req.body.password,postItem.password);
        // if(!isValidPassword) return res.status(400).send({errorMessage:'password is wrong!!!'});

       

        res.json({post:{
            title:postItem.title,
            body:postItem.body,
            categorys:categoryCollection,
            postImage:postItem.postImage,
            _id:postItem._id
        }});


    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
});

router.delete('/:postId', async (req,res)=>{
    try {
       const findPost=await Post.findById(req.params.postId);

       if(!findPost) return res.status(400).send({errorMessage:'POST not found !!!'})
       const deleteItem=await Post.deleteOne({_id:req.params.postId});



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

router.post('/', upload.single('postImage'), async (req,res)=>{
     const validationResult = postValidation(req.body);

     if(validationResult && validationResult.error) return res.status(400).send(validationResult) 
     
      const postInDB=await Post.findOne({title:req.body.title});
      if(postInDB ) return res.status(400).send({errorMessage:"you cannot create this post because it is exist in DB!!!"});

      let passwordOfPost=null;
      if(req.body.password)
        passwordOfPost=await generateCryptData(req.body.password );

        const postInstance=new Post({
            // _id:new Mongoose.Types.ObjectId(),
            id:req.body.id,
            userId:req.body.userId,
            title:req.body.title,
            body:req.body.body,
            password:  passwordOfPost,
            categorys:req.body.categorys,
            postImage:req.file.path
        });

        try {
            const savePost= await postInstance.save();
            res.json({post:{
                title:savePost.title,
                body:savePost.body,
                categorys:savePost.categorys,
                _id:savePost._id
            }});
        } catch (error) {
                res.status(400).send(error)
        }

 });

module.exports=router;

