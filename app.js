//call express 
const express=require('express');
const app=express();

// File directory
var fs = require('fs')
var path = require('path')

//call mongoose
const mongoose=require('mongoose');

//call env variables
require('dotenv').config();

//call morgan for log only in development environment 
//HTTP request logger middleware for node.js

// var morgan = require('morgan');
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan('dev', { stream: accessLogStream }))

// mongoose-morgan
var mongooseMorgan = require('mongoose-morgan');
// Logger
 
// Mongoose-morgan
//TODO: config DB && Skip code < 400
app.use(mongooseMorgan({
  collection: 'error_logger',
  connectionString: 'mongodb+srv://sa:400141@cluster0.0jhir.mongodb.net/postDB?retryWrites=true&w=majority&ssl=true',
  user: 'sa',
  pass: '400141'
 }
 ,{
  skip: function (req, res) {
      return res.statusCode < 100;
  }
 }
 ,'combined'
));
 

//call cors
const cors=require('cors');
var corsOptions = {
    origin:['http://rezablog.herokuapp.com','http://localhost:4200'],
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
 

//call Post & login router
const postRouter=require('./routes/posts');
const loginRouter=require('./routes/login');
const categoryRouter=require('./routes/category')

app.use('/posts',postRouter); 
app.use('/login',loginRouter); 
app.use('/category',categoryRouter); 


// public folder post-uploads uses when upload a post and you want to return image that is uploaded with user
app.use('/post-uploads',express.static('post-uploads'))

// app.use('/',(req,res)=>{
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<h1 >Wellcome to my posty web API</h1>');
// });


//handle 404 error
app.use( (req,res,next)=>{
  let error=new Error('Page not found !!!');
  error.status=404;
  next(error);
});

//call to cover all error if error has happended unexceptly
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    errorMessage:error.message
  });
})



//connect to mongoose DB.
 mongoose.connect('mongodb+srv://sa:400141@cluster0.0jhir.mongodb.net/postDB?retryWrites=true&w=majority&ssl=true',{useNewUrlParser: true, useUnifiedTopology: true},(()=>{
    console.log('DB is running...')
}));



//run app in specefic port...
// app.listen(3000)
 
const port = process.env.PORT || 3000
 
// server.listen(port,() => {
 
//   console.log(`Server running at port `+port);
// });
app.listen(port, () => {
    console.log(`OK!`)
  })