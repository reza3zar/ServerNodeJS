"use strict";

var express = require('express');

var router = express.Router();
router.use(express.json());

var bcryptjs = require('bcryptjs');

var _require = require('../validations/loginInfo'),
    loginValidation = _require.loginValidation;

var _require2 = require('../validations/registerValidation'),
    registerValidation = _require2.registerValidation;

var login = require('../models/loginInfo');

var jsonwebtoken = require('jsonwebtoken');

var _require3 = require('../utilities/cryptoHandler'),
    generateCryptData = _require3.generateCryptData;

router.post('/', function _callee(req, res) {
  var loginValidationResult, findLoginInformation, isCorrectPassword, jwt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          loginValidationResult = loginValidation(req.body);

          if (!(loginValidationResult && loginValidationResult.error)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).send(loginValidationResult));

        case 4:
          console.log('1');
          _context.next = 7;
          return regeneratorRuntime.awrap(login.findOne({
            userName: req.body.userName
          }));

        case 7:
          findLoginInformation = _context.sent;
          console.log('2');

          if (findLoginInformation) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            errorMessage: 'User not found!!!'
          }));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(bcryptjs.compare(req.body.password, findLoginInformation.password));

        case 13:
          isCorrectPassword = _context.sent;

          if (isCorrectPassword) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            errorMessage: 'userName/password is invalid !!!'
          }));

        case 16:
          jwt = jsonwebtoken.sign({
            _id: findLoginInformation._id,
            email: findLoginInformation.email,
            expireDate: Date.now
          }, process.env.TOKEN_ENCRYPT);
          return _context.abrupt("return", res.header('auth-token', jwt).send({
            email: findLoginInformation.email
          }));

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
});
router.post('/register', function _callee2(req, res) {
  var registerValidationResult, findLoginInformation, cryptoPassword, newUserInformation, registerUserInformation;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (!(Object.keys(req.body).length === 0)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).send({
            errorMessage: 'please fill mandatory params !!!'
          }));

        case 3:
          registerValidationResult = registerValidation(req.body);

          if (!(registerValidationResult && registerValidationResult.error)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).send(registerValidationResult));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(login.findOne({
            userName: req.body.userName
          }));

        case 8:
          findLoginInformation = _context2.sent;

          if (!findLoginInformation) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(409).send({
            errorMessage: 'User is already exist !!!'
          }));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(generateCryptData(req.body.password));

        case 13:
          cryptoPassword = _context2.sent;
          newUserInformation = new login({
            email: req.body.email,
            userName: req.body.userName,
            password: cryptoPassword
          });
          console.log('newUserInformation:', newUserInformation);
          _context2.next = 18;
          return regeneratorRuntime.awrap(newUserInformation.save());

        case 18:
          registerUserInformation = _context2.sent;
          console.log('registerUserInformation:', registerUserInformation);
          return _context2.abrupt("return", res.send({
            _id: registerUserInformation._id
          }));

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](0);

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 23]]);
});
module.exports = router;