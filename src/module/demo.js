
/*
 * @author: liuwengai
 * @date: 2019-03-19
 * @file: demo页面
 */

import {
  observable, action, runInAction, computed,
} from 'mobx';
import minimalRequest from '@util/fetch';
import demoApi from '@api/demo';
import { message } from 'antd';

export default class Demo {
  @observable demoList = [];

  @action.bound
  async getDemoList() {
    try {
      const res = await minimalRequest(demoApi.getDemoList);
      runInAction('getDemoList', () => {
        // console.log('-----res', res);
        this.demoList = res.list;
      });
    } catch (e) {
      message.error(e.message);
    }
  }

  @action.bound
  // eslint-disable-next-line class-methods-use-this
  async updateDemo(params) {
    try {
      await minimalRequest(demoApi.updateDemo, params);
    } catch (e) {
      message.error(e.message);
    }
  }

  @computed get demoListLength() {
    return (this.demoList && this.demoList.length) || 0;
  }
}
