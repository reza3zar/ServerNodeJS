//call express 
const express=require('express');
const app=express();
//call mongoose
const mongoose=require('mongoose');

//call env variables
require('dotenv').config();

//call cors
// const cors=require('cors');
// app.use(cors);

//call Post & login router
const postRouter=require('./routes/posts');
const loginRouter=require('./routes/login');

app.use('/posts',postRouter); 
app.use('/login',loginRouter); 


//connect to mongoose DB.
 mongoose.connect('mongodb+srv://sa:400141@cluster0.0jhir.mongodb.net/postDB?retryWrites=true&w=majority&ssl=true',{useNewUrlParser: true, useUnifiedTopology: true},(()=>{
    console.log('DB is running...')
}));



//run app in specefic port...
// app.listen(3000)
const http = require('http');
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1 >Wellcome to my posty web API</h1>');
});

// server.listen(port,() => {
 
//   console.log(`Server running at port `+port);
// });
app.listen(port, () => {
    console.log(`OK!`)
  })