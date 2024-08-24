import { IReply } from '../models/interfaces/IReply';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';
import chatRepository from '../repositories/chatRepository';

class ChatManager {
  private DEFAULT_USER_SENDER: string = 'User';

  public async load(waifuPack: string, waifuCard: IWaifuCard): Promise<void> {
    if (await chatRepository.hasChatHistory(waifuPack)) {
      return;
    }

    chatRepository.saveReply(
      {
        content: waifuCard.intialReply,
        sender: waifuCard.name,
        date: new Date().toISOString(),
      },
      waifuPack,
    );
  }

  public async saveReply(text: string, waifuPack: string, waifuName?: string): Promise<IReply[]> {
    return chatRepository.saveReply(
      {
        content: text.trim(),
        sender: waifuName || this.DEFAULT_USER_SENDER,
        date: new Date().toISOString(),
      },
      waifuPack,
    );
  }

  public async getReplies(waifuPack: string) {
    return chatRepository.getReplies(waifuPack);
  }

  public async deleteAllReplies(waifuPack: string) {
    await chatRepository.deleteAllReplies(waifuPack);
  }
}

export default new ChatManager();
