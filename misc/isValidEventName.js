module.exports = function(eventName) {
  if (!eventName || typeof eventName !== 'string') return false;
  return true;
};