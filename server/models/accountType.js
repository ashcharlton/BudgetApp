const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// Account Schema
const AccountTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
      type: Number,
      required: true
  }
});

module.exports = Mongoose.model('AccountType', AccountTypeSchema);
