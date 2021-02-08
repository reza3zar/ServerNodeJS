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
var morgan = require('morgan');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))


 

//call cors
const cors=require('cors');
var corsOptions = {
    origin: 'http://rezablog.herokuapp.com',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
 

//call Post & login router
const postRouter=require('./routes/posts');
const loginRouter=require('./routes/login');

app.use('/posts',postRouter); 
app.use('/login',loginRouter); 
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