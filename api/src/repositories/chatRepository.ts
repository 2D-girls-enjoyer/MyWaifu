import fs from 'node:fs/promises';
import resourcesConstants from '../configurations/resourcesConstants';
import { IChatStorage, IReply } from '../models/interfaces/IReply';
import fileUtils from '../utils/fileUtils';

class ChatRepository {
  public async saveReply(reply: IReply, waifuPack: string): Promise<IReply[]> {
    let chat: IReply[];

    try {
      chat = await this.getReplies(waifuPack);
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        console.log(`Unexpected error at access ${waifuPack} chat summary`);
        throw new Error(`Unexpected error at access ${waifuPack} chat summary`);
      }

      console.log(`Chat summary for ${waifuPack} does not exist`);
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

  private capIfNecessary(replies: IReply[]): void {
    if (replies.length >= resourcesConstants.REPLIES_MAX_AMOUNT_SAVE) {
      replies.shift();
    }
  }
}

export default new ChatRepository();
