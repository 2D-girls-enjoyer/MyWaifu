import { action, makeObservable, observable } from 'mobx';
import http from '../infra/http';

class Store {
  waifuName: string = '';

  username: string = '';

  constructor() {
    makeObservable(this, {
      waifuName: observable,
      username: observable,
      setUsername: action,
      setWaifuName: action,
      loadUsername: action,
    });
  }

  setWaifuName(waifuName: string) {
    this.waifuName = waifuName;
  }

  setUsername(username: string) {
    this.username = username;
  }

  async loadUsername() {
    const { username } = await http.getUsername();
    this.setUsername(username);
  }
}

export default new Store();
