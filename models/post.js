const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
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
    }

});


module.exports=mongoose.model('Posts',postSchema)
