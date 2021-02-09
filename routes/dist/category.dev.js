"use strict";

var express = require('express');

var router = express.Router();

var Category = require('../models/category');

router.use(express.json());
router.get('/', function _callee(req, res) {
  var categoryCollection;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Category.find());

        case 3:
          categoryCollection = _context.sent;
          res.json({
            result: categoryCollection
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
router.get('/:categoryId', function _callee2(req, res) {
  var categoryItem;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Category.findById(req.params.categoryId));

        case 3:
          categoryItem = _context2.sent;

          if (categoryItem) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('category not find!'));

        case 6:
          res.json({
            result: categoryItem
          });
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.json({
            message: _context2.t0
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router["delete"]('/:categoryId', function _callee3(req, res) {
  var findcategory, deleteItem;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Category.findById(req.params.categoryId));

        case 3:
          findcategory = _context3.sent;

          if (findcategory) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).send({
            errorMessage: 'category not found !!!'
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(Category.deleteOne({
            _id: req.params.categoryId
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
router.patch('/:categoryId', function _callee4(req, res) {
  var updateItem;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Category.updateOne({
            _id: req.params.categoryId
          }, {
            $set: {
              name: req.body.name
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
  var categoryInDB, categoryInstance, savecategory;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Category.findOne({
            name: req.body.name
          }));

        case 2:
          categoryInDB = _context5.sent;

          if (!categoryInDB) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(400).send({
            errorMessage: "you cannot create this category because it is exist in DB!!!"
          }));

        case 5:
          categoryInstance = new Category({
            // _id:new Mongoose.Types.ObjectId(),
            id: req.body.id,
            name: req.body.name
          });
          _context5.prev = 6;
          _context5.next = 9;
          return regeneratorRuntime.awrap(categoryInstance.save());

        case 9:
          savecategory = _context5.sent;
          res.json({
            category: {
              name: savecategory.name,
              _id: savecategory._id
            }
          });
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](6);
          res.status(400).send(_context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[6, 13]]);
});
module.exports = router;