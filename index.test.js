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

test('should throw missing event name or handler error', () => {
  const events = new ManyEvents();
  expect(() => events.remove(null)).toThrow('Specify a event name and a event handler to remove.');
  expect(() => events.remove('Filled', null)).toThrow('Specify a event name and a event handler to remove.');
});

test('should throw missing event name error', () => {
  const events = new ManyEvents();
  expect(() => events.removeAll(null)).toThrow('Specify a event to remove handlers from.');
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

test('can use middleware', done => {
  function cookedJellybean() {
    const events = new ManyEvents();
    events.on('test', data => {
      expect(data).toBe('cooked jellybean');
      done();
    });
    events.use('test', (data, updateData) => {
      if (data === 'cooked') updateData(data + ' jellybean');
    });
    events.send('test', 'cooked');
  }
  cookedJellybean();
});

test('alias should work', done => {
  function cookedJellybean() {
    const events = new ManyEvents();
    events.on('test', data => {
      expect(data).toBe('cooked jellybean');
      done();
    });
    events.useMiddleware('test', (data, updateData) => {
      if (data === 'cooked') updateData(data + ' jellybean');
    });
    events.send('test', 'cooked');
  }
  cookedJellybean();
});

test('should throw invalid event name error', () => {
  const events = new ManyEvents();
  expect(() => events.use(123)).toThrow('Invalid event name. Should be a string.');
});

test('should throw missing middleware error', () => {
  const events = new ManyEvents();
  expect(() => events.removeMiddleware(null)).toThrow('Specify a event name and a middleware to remove.');
});

test('data should be unaltered after removing middleware', done => {
  function cookedJellybean() {
    const events = new ManyEvents();
    events.on('test', data => {
      expect(data).toBe('cooked');
      done();
    });
    function cookTheJellybean(data, updateData) {
      if (data === 'cooked') updateData(data + ' jellybean');
    }
    events.use('test', cookTheJellybean);
    events.removeMiddleware('test', cookTheJellybean);
    events.send('test', 'cooked');
  }
  cookedJellybean();
});

test('data should be unaltered after removing all middleware', done => {
  function cookedJellybean() {
    const events = new ManyEvents();
    events.on('test', data => {
      expect(data).toBe('cooked');
      done();
    });
    function cookTheJellybean(data, updateData) {
      if (data === 'cooked') updateData(data + ' jellybean');
    }
    events.use('test', cookTheJellybean);
    events.removeAllMiddleware('test');
    events.send('test', 'cooked');
  }
  cookedJellybean();
});

test('should throw missing event name error', () => {
  function cookedJellybean() {
    const events = new ManyEvents();
    events.removeAllMiddleware();
  }
  expect(cookedJellybean).toThrow('Specify a event to which remove all middleware from.');
});