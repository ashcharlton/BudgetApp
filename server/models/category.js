const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// Category Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  outgoing: {
    type: Boolean,
    required: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Category', CategorySchema);
