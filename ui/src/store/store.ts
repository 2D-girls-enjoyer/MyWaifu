import { action, makeObservable, observable } from 'mobx';
import http from '../infra/http';
import { IReply } from '../models/interfaces/apiRequests';
import ErrorFetch from '../models/errors/errorFetch';
import { ErrorName } from '../models/errors/enum/errorName';

enum FetchOperation {
  GET_CHAT = 'GET_CHAT',
  GENERATE_RESPONSE = 'GENERATE_RESPONSE',
  DELETE_CHAT = 'DELETE_CHAT',
  SELECT_WAIFU = 'SELECT_WAIFU',
  DELETE_WAIFU = 'DELETE_WAIFU',
  GET_USERNAME = 'GET_USERNAME',
  SAVE_USERNAME = 'SAVE_USERNAME',
}

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
      generateChat: action,
      selectWaifu: action,
      loadWaifuChat: action,
      deleteWaifuChat: action,
      loadUsername: action,
      saveUsername: action,
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

  async generateChat(userMessageToBeSent: string) {
    const waifuResponsePromise = this.fetch(FetchOperation.GENERATE_RESPONSE, {
      userReply: userMessageToBeSent,
    });
    this.appendReply({
      content: userMessageToBeSent,
      sender: 'User',
      date: new Date().toString(),
    });
    const { response } = await waifuResponsePromise;
    this.appendReply({
      content: response,
      sender: this.waifuName,
      date: new Date().toString(),
    });
  }

  async selectWaifu(waifu: string) {
    if (waifu !== this.waifuName) {
      await this.fetch(FetchOperation.SELECT_WAIFU, { waifu });
      this.setWaifuName(waifu);
    }
  }

  async loadWaifuChat() {
    const { chatSummary } = await this.fetch(FetchOperation.GET_CHAT);
    this.setChat(chatSummary);
  }

  async deleteWaifuChat() {
    await this.fetch(FetchOperation.DELETE_WAIFU);
    const { chatSummary } = await this.fetch(FetchOperation.GET_CHAT);
    this.setChat(chatSummary);
  }

  async loadUsername() {
    const { username } = await this.fetch(FetchOperation.GET_USERNAME);
    this.setUsername(username);
  }

  async saveUsername() {
    http.saveUsername({ username: this.username.trim() });
    this.setUsername(this.username.trim());
  }

  private async fetch(operation: FetchOperation, args?: any): Promise<any> {
    try {
      return await this.executeFetchOperation(operation, args);
    } catch (err: any) {
      if (err instanceof ErrorFetch
        && err?.errorName === ErrorName.WAIFU_NOT_SELECTED
        && this.waifuName !== '') {
        await this.fetch(FetchOperation.SELECT_WAIFU, { waifu: this.waifuName });
        return this.executeFetchOperation(operation, args);
      }

      throw err;
    }
  }

  private async executeFetchOperation(operation: FetchOperation, args?: any) {
    switch (operation) {
      case FetchOperation.GET_CHAT:
        return http.getWaifuChat();
      case FetchOperation.DELETE_CHAT:
        return http.deleteWaifuChat();
      case FetchOperation.GENERATE_RESPONSE:
        return http.generateWaifuResponse(args);
      case FetchOperation.SELECT_WAIFU:
        return http.selectWaifu(args);
      case FetchOperation.DELETE_WAIFU:
        return http.deleteWaifuChat();
      case FetchOperation.GET_USERNAME:
        return http.getUsername();
      case FetchOperation.SAVE_USERNAME:
        return http.saveUsername(args);
      default:
        return undefined;
    }
  }
}

export default new Store();
