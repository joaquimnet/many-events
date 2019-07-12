const isValidEventName = require('./misc/isValidEventName');

function ManyEvents(config) {
  this.events = new Map();
  this.middleware = new Map();

  this.suppressMissingHandlerError =
    config && config.suppressMissingHandlerError;

  this.on = function(eventName, handler) {
    if (!isValidEventName(eventName)) {
      throw new Error('Invalid event name. Should be a string.');
    }
    if (this.events.has(eventName)) {
      this.events.set(eventName, [...this.events.get(eventName), handler]);
    } else {
      this.events.set(eventName, [handler]);
    }
  };

  this.remove = function(eventName, handler) {
    if (!eventName || !handler) {
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

  this.removeAll = function(eventName) {
    if (!eventName) {
      throw new Error('Specify a event to remove handlers from.');
    }
    if (this.events.has(eventName)) {
      this.events.delete(eventName);
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
    if (this.middleware.has(eventName)) {
      // Run all middleware for this event
      this.middleware
        .get(eventName)
        // Passing data plus a updateData function to the middleware
        .forEach(handler => handler(data, updatedData => (data = updatedData)));
    }
    this.events.get(eventName).forEach(handler => handler(data));
  };

  this.use = function(eventName, handler) {
    if (!isValidEventName(eventName)) {
      throw new Error('Invalid event name. Should be a string.');
    }
    if (this.middleware.has(eventName)) {
      this.middleware.set(eventName, [
        ...this.middleware.get(eventName),
        handler,
      ]);
    } else {
      this.middleware.set(eventName, [handler]);
    }
  };

  this.useMiddleware = this.use;

  this.removeMiddleware = function(eventName, handler) {
    if (!handler) {
      throw new Error('Specify a event name and a middleware to remove.');
    }
    if (this.middleware.has(eventName)) {
      const filteredHandlers = this.middleware
        .get(eventName)
        .filter(h => h !== handler);
      if (filteredHandlers.length <= 0) {
        this.middleware.delete(eventName);
      } else {
        this.middleware.set(eventName, [...filteredHandlers]);
      }
    }
  };

  this.removeAllMiddleware = function(eventName) {
    if (!eventName) {
      throw new Error('Specify a event to which remove all middleware from.');
    }
    if (this.middleware.has(eventName)) {
      this.middleware.delete(eventName);
    }
  };
}

module.exports = ManyEvents;
