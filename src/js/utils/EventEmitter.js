export default class EventEmitter {
  constructor() {
    this.handlers = [];
  }

  dispatch(event) {
    this.handlers.forEach((handler) => {
      handler(event);
    });
  }

  subscribe(handler) {
    if (this.handlers.indexOf(handler) === -1
      && typeof handler === 'function') {
      this.handlers.push(handler);
    }
  }

  unsubscribe(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }
}
