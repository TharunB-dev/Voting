const mongoose = require('mongoose');
const User = require('./user');

const optionSchema = new mongoose.Schema({
  option: String,
  votes: {
    type: Number,
    default: 0,
  },
  imageUrl: String,
  color: String,
});

const pollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  question: String,
  options: [optionSchema],
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  isPremium: {
    type: Boolean,
    default: false,
  },
  customTheme: {
    type: String,
    default: 'default',
  },
  allowMultipleVotes: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: function() {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    }
  },
  maxVotesPerUser: {
    type: Number,
    default: 1
  },
  hideResults: {
    type: Boolean,
    default: false
  }
});

pollSchema.pre('remove', async function(next) {
  try {
    const user = await User.findById(this.user);
    user.polls = user.polls.filter(
      poll => poll._id.toString() !== this._id.toString(),
    );
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('Poll', pollSchema);
