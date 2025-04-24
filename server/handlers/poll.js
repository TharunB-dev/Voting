const db = require('../models');

exports.showPolls = async (req, res, next) => {
  try {
    const polls = await db.Poll.find().populate('user', ['username', 'id']);
    // .populate('voted', ['username', 'id']);

    return res.status(200).json(polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.usersPolls = async (req, res, next) => {
  const { id } = req.decoded;
  try {
    const user = await db.User.findById(id).populate('polls');

    return res.status(200).json(user.polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.createPoll = async (req, res, next) => {
  const { id } = req.decoded;
  const { 
    question, 
    options, 
    customTheme, 
    allowMultipleVotes, 
    expiresAt, 
    maxVotesPerUser, 
    hideResults 
  } = req.body;
  
  try {
    const user = await db.User.findById(id);
    
    // Check if premium features are being used by a non-premium user
    const usingPremiumFeatures = customTheme || allowMultipleVotes || maxVotesPerUser > 1 || hideResults;
    if (usingPremiumFeatures && !(user.isPremium || user.role === 'premium' || user.role === 'admin')) {
      throw new Error('Premium membership required for these features');
    }
    
    // Process options with any premium features
    const processedOptions = options.map(opt => {
      if (typeof opt === 'string') {
        return { option: opt, votes: 0 };
      } else {
        // Handle premium option features like image and color
        return { 
          option: opt.option, 
          votes: 0,
          imageUrl: opt.imageUrl,
          color: opt.color
        };
      }
    });
    
    const poll = await db.Poll.create({
      question,
      user,
      options: processedOptions,
      isPremium: user.isPremium || user.role === 'premium' || user.role === 'admin',
      customTheme,
      allowMultipleVotes,
      expiresAt,
      maxVotesPerUser: maxVotesPerUser || 1,
      hideResults
    });
    
    user.polls.push(poll._id);
    await user.save();

    return res.status(201).json({ ...poll._doc, user: user._id });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.vote = async (req, res, next) => {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  const { answer } = req.body;
  try {
    if (answer) {
      const poll = await db.Poll.findById(pollId);
      if (!poll) throw new Error('No poll found');

      // Check if poll has expired
      if (poll.expiresAt && new Date() > new Date(poll.expiresAt)) {
        throw new Error('This poll has expired');
      }

      const vote = poll.options.map(
        option =>
          option.option === answer
            ? {
                option: option.option,
                _id: option._id,
                votes: option.votes + 1,
                imageUrl: option.imageUrl,
                color: option.color
              }
            : option,
      );

      // Check voting permissions
      const userVoteCount = poll.voted.filter(user => user.toString() === userId).length;
      
      // For regular polls, only one vote per user
      if (!poll.allowMultipleVotes && userVoteCount > 0) {
        throw new Error('Already voted');
      }
      
      // For premium polls with multiple votes, check maxVotesPerUser
      if (poll.allowMultipleVotes && userVoteCount >= poll.maxVotesPerUser) {
        throw new Error(`Maximum votes reached (${poll.maxVotesPerUser})`);
      }

      // Add vote
      poll.voted.push(userId);
      poll.options = vote;
      await poll.save();

      // If hideResults is enabled and user is not the poll creator
      if (poll.hideResults && poll.user.toString() !== userId) {
        // Return poll without vote counts
        const limitedPoll = {
          ...poll._doc,
          options: poll.options.map(opt => ({
            ...opt._doc,
            votes: "hidden" // Hide actual vote count
          }))
        };
        return res.status(202).json(limitedPoll);
      }

      return res.status(202).json(poll);
    } else {
      throw new Error('No Answer Provided');
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await db.Poll.findById(id).populate('user', [
      'username',
      'id',
    ]);
    // .populate('voted', ['username', 'id']);
    if (!poll) throw new Error('No poll found');

    return res.status(200).json(poll);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deletePoll = async (req, res, next) => {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  try {
    let user = await db.User.findById(userId)
    if(user.polls) { // not sure if necessary either...
      user.polls = user.polls.filter(userPoll => {
        return userPoll._id.toString() !== pollId.toString() // not sure if necessary to use toString()
      })
    }
    
    const poll = await db.Poll.findById(pollId);
    if (!poll) throw new Error('No poll found');
    if (poll.user.toString() !== userId) {
      throw new Error('Unauthorized access');
    }
    await user.save()
    await poll.remove();
    return res.status(202).json({ poll, deleted: true });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
