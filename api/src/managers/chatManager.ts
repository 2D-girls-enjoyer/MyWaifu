import { IReply } from '../models/interfaces/IReply';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';
import chatRepository from '../repositories/chatRepository';

class ChatManager {
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

  public async saveReply(text: string, sender: string, waifuPack: string): Promise<IReply[]> {
    return chatRepository.saveReply(
      {
        content: text.trim(),
        sender: sender.trim(),
        date: new Date().toISOString(),
      },
      waifuPack,
    );
  }

  public async getReplies(waifuPack: string) {
    return chatRepository.getReplies(waifuPack);
  }
}

export default new ChatManager();
