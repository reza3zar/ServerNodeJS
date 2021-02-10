const express=require('express');
const router=express.Router();
const Category=require('../models/category')
router.use(express.json());

 
 
router.get('/' ,async (req,res)=>{
    try {
        const categoryCollection=await Category.find();
        res.json({result:categoryCollection});
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
});

router.get('/:categoryId', async (req,res)=>{
    try {
     
        const categoryItem=await Category.findById(req.params.categoryId);
        if(!categoryItem) return res.status(400).send('category not find!');

        res.json({result:categoryItem})
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
});

router.delete('/:categoryId', async (req,res)=>{
    try {
       const findcategory=await Category.findById(req.params.categoryId);

       if(!findcategory) return res.status(400).send({errorMessage:'category not found !!!'})
       const deleteItem=await Category.deleteOne({_id:req.params.categoryId});

        res.json({result:deleteItem})
    } catch (error) {
        res.json({message:error})
    }
});

router.patch('/:categoryId', async (req,res)=>{
    try {
       const updateItem=await Category.updateOne({_id:req.params.categoryId},{$set:{name:req.body.name}})
        res.json({result:updateItem})
    } catch (error) {
        res.json({message:error})
    }
});

router.post('/', async (req,res)=>{
 
        //TODO: check base on id 
      const categoryInDB=await Category.findOne({name:req.body.name });
      if(categoryInDB ) return res.status(409).send({errorMessage:"you cannot create this category because it is exist in DB!!!"})

        const categoryInstance=new Category({
            // _id:new Mongoose.Types.ObjectId(),
            id:req.body.id,
            name:req.body.name
        });

        try {
            const savecategory= await categoryInstance.save();
            res.json({category:{
                name:savecategory.name,
                _id:savecategory._id
            }});
        } catch (error) {
                res.status(400).send(error)
        }

 });

module.exports=router;

