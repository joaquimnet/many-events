# Many Events

[![Build Status](https://travis-ci.com/joaquimnet/many-events.svg?branch=master)](https://travis-ci.com/joaquimnet/many-events)

Listen to and send events.

Example:

  ```javascript
  const ManyEvents = require('many-events');

  const eventBus = new ManyEvents();

  // your event handler
  function doSomething(data) {
    console.log(data);
  }

  // listen for the 'my-amazing-event' event
  eventBus.on('my-amazing-event', doSomething);

  // firing the event
  eventBus.send('my-amazing-event', 'peanut butter'); // output -> peanut butter
  ```

## Installation

`npm i many-events`

## License

The project is licensed under the MIT license.

## Planned

- Add middleware to modify event data

## API

### **new ManyEvents(options);**

The constructor for a new event bus.

- options: Object
  - The configuration object
- **Returns: ManyEvents instance**

**Options object:**

| Option | Effect |
|--|--|
| suppressMissingHandlerError | Wether to suppress the error that is thrown if an event is fired without any handlers. (Default: false) |

---

### **ManyEvents.on(eventName, handler);**

Adds an event listener to be executed when the event is fired.

- eventName: String
  - The event name.
- handler: Function
  - The function to be called when the event fires.
- **Returns: void**

---

### **ManyEvents.send(eventName, data);**

Fires an event and sends data.

- eventName: String
  - The event to be fired.
- data: any
  - The data that will be passed to the handlers.
- **Returns: void**

---

### **ManyEvents.remove(eventName, handler);**

Removes an event handler.

- eventName: String
  - The event name.
- handler: Function
  - A reference to the function to be removed.
- **Returns: void**

---

### **ManyEvents.removeAll(eventName);**

Removes all handlers for an event.

- eventName: String
  - The event name.
- **Returns: void**

---

### **ManyEvents.use(eventName, middleware);**

Removes all handlers for an event.

- eventName: String
  - The event to which the middleware will be attached.
- middleware: Function
  - The middleware to be added.
- **Returns: void**

---

### **ManyEvents.removeMiddleware(eventName, middleware);**

Removes all handlers for an event.

- eventName: String
  - The event from which the middleware will be removed.
- middleware: Function
  - A reference to the middleware to be removed.
- **Returns: void**

---

### **ManyEvents.removeAllMiddleware(eventName);**

Removes all middleware for an event.

- eventName: String
  - The event name.
- **Returns: void**

---

### **How a middleware looks**

- The **data** argument will be either the original data sent by the event emitter or data modified by the previous middleware.
- The **updateData** function will replace the data with whatever you pass into it.

```javascript
function middleware(data, updateData) {
  // This function will update the data that will be passed to the next middleware and event handlers
  updateData(data);
}
```
