import { makeAutoObservable, action } from 'mobx';

class HomeStore {
  content = '首页'

  rows = [];

  progress = 1;

  constructor() {
    makeAutoObservable(this);
  }

  @action setRows(rows) {
    this.rows = Array.from(rows);
  }

  @action setProgress(progress) {
    this.progress = progress;
  }
}

export default new HomeStore();
