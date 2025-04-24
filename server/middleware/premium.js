module.exports = (req, res, next) => {
  if (req.decoded && (req.decoded.isPremium || req.decoded.role === 'premium' || req.decoded.role === 'admin')) {
    next();
  } else {
    next(Error('Premium membership required for this feature'));
  }
}; 