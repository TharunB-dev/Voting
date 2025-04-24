module.exports = (req, res, next) => {
  if (req.decoded && req.decoded.role === 'admin') {
    next();
  } else {
    next(Error('Admin privileges required for this function'));
  }
}; 