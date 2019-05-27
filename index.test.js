const ManyEvents = require('./index');

test('can send and handle events', done => {
  function myPeanutButter() {
    const events = new ManyEvents();
    events.on('test', data => {
      expect(data).toBe('peanut butter');
      done();
    });
    events.send('test', 'peanut butter');
  }
  myPeanutButter();
});

test('should throw missing handler error', () => {
  function thisWillThrow() {
    const events = new ManyEvents();
    events.send('anything', { any: 'thing' });
  }
  expect(thisWillThrow).toThrow('Event anything not found.');
});

test('should throw missing handler error after removing handler', () => {
  let count = 0;
  function increaseCount() {
    count++;
  }
  function countAndThrow() {
    const events = new ManyEvents();
    events.on('increase-count', increaseCount);
    events.send('increase-count', null);
    events.remove('increase-count', increaseCount);
    events.send('increase-count', null);
  }
  expect(countAndThrow).toThrow('Event increase-count not found.');
  expect(count).toEqual(1);
});

test('should throw missing handler error after removing all handlers', () => {
  let count = 0;
  function increaseCount() {
    count++;
  }
  function countAndThrow() {
    const events = new ManyEvents();
    events.on('increase-count', increaseCount);
    events.send('increase-count', null);
    events.removeAll('increase-count');
    events.send('increase-count', null);
  }
  expect(countAndThrow).toThrow('Event increase-count not found.');
  expect(count).toEqual(1);
});

test('should NOT throw missing handler error', () => {
  function thisWillThrow() {
    const events = new ManyEvents({ suppressMissingHandlerError: true });
    events.send('anything', { any: 'thing' });
  }
  expect(thisWillThrow).not.toThrow();
});