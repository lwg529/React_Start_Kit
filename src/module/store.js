import Demo from './demo';
import App from './app';

class Store {
  constructor() {
    this.demo = new Demo();
    this.app = new App();
  }
}

const store = new Store();

export default store;
