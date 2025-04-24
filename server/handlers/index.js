module.exports = {
  ...require('./auth'),
  ...require('./poll'),
  admin: require('./admin'),
};

module.exports.error = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Something went wrong.',
    },
  });
};
