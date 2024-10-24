import fs from 'node:fs/promises';
import resourcesConstants from '../configurations/resourcesConstants';
import { IChatStorage, IReply } from '../models/interfaces/IReply';
import fileUtils from '../utils/fileUtils';
import customConfigurations from '../configurations/customConfigurations';
import ProcessError from '../models/errors/ProcessError';
import ErrorSubType from '../models/errors/enum/errorSubType';

class ChatRepository {
  // TEMPORARY!!! On prototype 3 (last) I'll test saving/control chat on SQLite
  public async saveReply(reply: IReply, waifuPack: string): Promise<IReply[]> {
    if (!waifuPack || waifuPack === '') {
      throw new ProcessError('', ErrorSubType.WAIFU_NOT_SELECTED);
    }

    let chat: IReply[];

    try {
      chat = await this.getReplies(waifuPack);
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        console.log(`Unexpected error at access ${waifuPack} chat summary`);
        throw new Error(`Unexpected error at access ${waifuPack} chat summary`);
      }
      chat = [];
    }

    this.capIfNecessary(chat);
    chat.push(reply);
    fileUtils.write(
      `${resourcesConstants.DATA_PATH}/${waifuPack}`,
      'recentChat.json',
      JSON.stringify({ data: chat } as IChatStorage),
      true,
    );

    return chat;
  }

  public async getReplies(waifuPack: string): Promise<IReply[]> {
    return (JSON.parse(
      await fs.readFile(`${resourcesConstants.DATA_PATH}/${waifuPack}/recentChat.json`, 'utf-8'),
    ) as IChatStorage)?.data;
  }

  public async hasChatHistory(waifuPack: string): Promise<boolean> {
    try {
      await fs.access(`${resourcesConstants.DATA_PATH}/${waifuPack}/recentChat.json`);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async deleteAllReplies(waifuPack: string): Promise<void> {
    await fileUtils.delete(
      `${resourcesConstants.DATA_PATH}/${waifuPack}`,
      'recentChat.json',
    );
  }

  private capIfNecessary(replies: IReply[]): void {
    if (replies.length >= customConfigurations.REPLIES_MAX_AMOUNT_SAVE) {
      replies.shift();
    }
  }
}

export default new ChatRepository();
