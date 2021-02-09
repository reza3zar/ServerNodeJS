const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    id:{
        type:Number,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
     title:{
         type:String,
         required:true,
         min:4,
         max:20
     },
     body:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    password:{
        type:String
    },
    categorys:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true

    }]

});


module.exports=mongoose.model('Posts',postSchema)
