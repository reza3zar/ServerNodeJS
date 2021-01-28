const mongoose=require('mongoose');

const loginInfoSchema={
    userName:{
        type:String,
        required:true,
        min:6,
        max:30
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:20
    },
    email:{
        type:String
    }
}

module.exports=mongoose.model('login',loginInfoSchema);