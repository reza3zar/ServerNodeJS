"use strict";

var bcrypyjs = require('bcryptjs');

function generateCryptData(data) {
  var salt;
  return regeneratorRuntime.async(function generateCryptData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypyjs.genSalt(10));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypyjs.hash(data, salt));

        case 6:
          return _context.abrupt("return", _context.sent);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log('generateCryptData:', _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

module.exports.generateCryptData = generateCryptData;