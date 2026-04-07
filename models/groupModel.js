const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Group must have a name'],
    unique: true,
    trim: true
  },
  description: String,
  image: String,
  admins: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;