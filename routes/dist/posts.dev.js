"use strict";

var express = require('express');

var router = express.Router();

var Post = require('../models/post');

router.use(express.json());

var _require = require('../validations/postValidation'),
    postValidation = _require.postValidation;

var bcrypyjs = require('bcryptjs');

var _require2 = require('../utilities/cryptoHandler'),
    generateCryptData = _require2.generateCryptData;

var authInterceptor = require('../interceptore/authInterceptor');

var _require3 = require('mongoose'),
    Mongoose = _require3.Mongoose;

var category = require('../models/category'); // const {postValidation}=require('../validations/postValidation')
// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// router.use((req,res,next)=>{
//     next();
// })


router.get('/', authInterceptor, function _callee(req, res) {
  var postCollection;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Post.find());

        case 3:
          postCollection = _context.sent;
          res.json({
            result: postCollection
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            message: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/:postId', function _callee2(req, res) {
  var postItem, categoryCollection;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.postId));

        case 3:
          postItem = _context2.sent;

          if (postItem) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('post not find!'));

        case 6:
          categoryCollection = null;

          if (!postItem.categorys) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(category.find({
            _id: {
              $in: postItem.categorys
            }
          }));

        case 10:
          categoryCollection = _context2.sent;

        case 11:
          // const isValidPassword=await bcrypyjs.compare(req.body.password,postItem.password);
          // if(!isValidPassword) return res.status(400).send({errorMessage:'password is wrong!!!'});
          res.json({
            post: {
              title: postItem.title,
              body: postItem.body,
              categorys: categoryCollection,
              _id: postItem._id
            }
          });
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.json({
            message: _context2.t0
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router["delete"]('/:postId', function _callee3(req, res) {
  var findPost, deleteItem;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.postId));

        case 3:
          findPost = _context3.sent;

          if (findPost) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).send({
            errorMessage: 'POST not found !!!'
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(Post.deleteOne({
            _id: req.params.postId
          }));

        case 8:
          deleteItem = _context3.sent;
          res.json({
            result: deleteItem
          });
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          res.json({
            message: _context3.t0
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.patch('/:postId', function _callee4(req, res) {
  var updateItem;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.updateOne({
            _id: req.params.postId
          }, {
            $set: {
              title: req.body.title
            }
          }));

        case 3:
          updateItem = _context4.sent;
          res.json({
            result: updateItem
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.json({
            message: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/', function _callee5(req, res) {
  var validationResult, postInDB, passwordOfPost, postInstance, savePost;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          validationResult = postValidation(req.body);

          if (!(validationResult && validationResult.error)) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).send(validationResult));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(Post.findOne({
            title: req.body.title
          }));

        case 5:
          postInDB = _context5.sent;

          if (!postInDB) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(400).send({
            errorMessage: "you cannot create this post because it is exist in DB!!!"
          }));

        case 8:
          console.log(req.body.categorys);
          _context5.next = 11;
          return regeneratorRuntime.awrap(generateCryptData(req.body.password));

        case 11:
          passwordOfPost = _context5.sent;
          postInstance = new Post({
            // _id:new Mongoose.Types.ObjectId(),
            id: req.body.id,
            userId: req.body.userId,
            title: req.body.title,
            body: req.body.body,
            password: passwordOfPost,
            categorys: req.body.categorys
          });
          _context5.prev = 13;
          _context5.next = 16;
          return regeneratorRuntime.awrap(postInstance.save());

        case 16:
          savePost = _context5.sent;
          res.json({
            post: {
              title: savePost.title,
              body: savePost.body,
              categorys: savePost.categorys,
              _id: savePost._id
            }
          });
          _context5.next = 23;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](13);
          res.status(400).send(_context5.t0);

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[13, 20]]);
});
module.exports = router;