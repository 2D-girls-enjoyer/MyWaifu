import { action, makeObservable, observable } from 'mobx';
import http from '../infra/http';
import { IReply } from '../interfaces/ApiRequests';

class Store {
  waifuName: string = '';

  username: string = '';

  chat: IReply[] = [];

  constructor() {
    makeObservable(this, {
      waifuName: observable,
      username: observable,
      chat: observable,
      setWaifuName: action,
      setUsername: action,
      setChat: action,
      appendReply: action,
      loadWaifuChat: action,
      deleteWaifuChat: action,
      loadUsername: action,

    });
  }

  setWaifuName(waifuName: string) {
    this.waifuName = waifuName;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setChat(replies: IReply[]) {
    this.chat = replies;
  }

  appendReply(reply: IReply) {
    this.chat.push(reply);
  }

  async loadWaifuChat() {
    const { chatSummary } = await http.getWaifuChat();
    this.setChat(chatSummary);
  }

  async deleteWaifuChat() {
    await http.deleteWaifuChat();
    const { chatSummary } = await http.getWaifuChat();
    this.setChat(chatSummary);
  }

  async loadUsername() {
    const { username } = await http.getUsername();
    this.setUsername(username);
  }
}

export default new Store();
