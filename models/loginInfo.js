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
        type:String, unique:true,
        // match:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    }
}

module.exports=mongoose.model('login',loginInfoSchema);