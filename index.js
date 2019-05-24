class Events {
  constructor() {
    this.events = new Map();
  }

  on(eventName, handler) {
    if (this.events.has(eventName)) {
      this.events.set(eventName, [...this.events.get(eventName), handler]);
    } else {
      this.events.set(eventName, [handler]);
    }
  }

  remove(eventName, handler) {
    if (this.events.has(eventName)) {
      const filteredHandlers = this.events
        .get(eventName)
        .filter(h => h !== handler);
      this.events.set(eventName, filteredHandlers);
    }
  }

  send(eventName, data) {
    if (!this.events.has(eventName)) {
      throw new Error(`Event ${eventName} not found.`);
    }
    try {
      this.events.get(eventName).forEach(evt => evt(data));
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Events;
