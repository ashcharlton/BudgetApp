const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// Account Schema
const AccountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'AccountType'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Account', AccountSchema);
