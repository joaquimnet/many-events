function Events(config) {
  this.events = new Map();
  this.suppressMissingHandlerError = config && config.suppressMissingHandlerError;

  this.on = function(eventName, handler) {
    if (this.events.has(eventName)) {
      this.events.set(eventName, [...this.events.get(eventName), handler]);
    } else {
      this.events.set(eventName, [handler]);
    }
  };

  this.remove = function(eventName, handler) {
    if (!handler) {
      throw new Error('Specify a event name and a event handler to remove.');
    }
    if (this.events.has(eventName)) {
      const filteredHandlers = this.events
        .get(eventName)
        .filter(h => h !== handler);
      if (filteredHandlers.length <= 0) {
        this.events.delete(eventName);
      } else {
        this.events.set(eventName, [...filteredHandlers]);
      }
    }
  };

  this.send = function(eventName, data) {
    if (!this.events.has(eventName)) {
      if (this.suppressMissingHandlerError) {
        return;
      } else {
        throw new Error(`Event ${eventName} not found.`);
      }
    }
    this.events.get(eventName).forEach(handler => handler(data));
  };
}

module.exports = Events;
