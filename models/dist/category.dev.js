"use strict";

var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  // _id:mongoose.Schema.Types.ObjectId,
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    min: 4,
    max: 20
  }
});
module.exports = mongoose.model('Category', categorySchema);