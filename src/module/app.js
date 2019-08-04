import {
  observable,
  action,
  runInAction,
} from 'mobx';
import minimalRequest from '@util/fetch';
import appApi from '@api/app';

export default class App {
  @observable menu = []

  @observable error = false

  @action.bound
  async fetchMenuData() {
    try {
      const res = await minimalRequest(appApi.menuList);
      runInAction('fetchMenuData', () => {
        this.menu = res;
      });
    } catch (e) {
      this.error = true;
    }
  }
}
