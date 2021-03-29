const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// Category Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  amount: {
    type: Number,
    required: true
  },
  transactionDate:{
    type: Date,
    required: true
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Category', CategorySchema);
