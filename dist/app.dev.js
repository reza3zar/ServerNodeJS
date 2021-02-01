"use strict";

//call express 
var express = require('express');

var app = express(); //call mongoose

var mongoose = require('mongoose'); //call env variables


require('dotenv').config(); //call cors


var cors = require('cors');

var corsOptions = {
  origin: 'http://rezablog.herokuapp.com',
  optionsSuccessStatus: 200 // For legacy browser support

};
app.use(cors(corsOptions)); //call Post & login router

var postRouter = require('./routes/posts');

var loginRouter = require('./routes/login');

app.use('/posts', postRouter);
app.use('/login', loginRouter);
app.use('/', function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1 >Wellcome to my posty web API</h1>');
}); //connect to mongoose DB.

mongoose.connect('mongodb+srv://sa:400141@cluster0.0jhir.mongodb.net/postDB?retryWrites=true&w=majority&ssl=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function () {
  console.log('DB is running...');
}); //run app in specefic port...
// app.listen(3000)

var port = process.env.PORT || 3000; // server.listen(port,() => {
//   console.log(`Server running at port `+port);
// });

app.listen(port, function () {
  console.log("OK!");
});