import { IWaifuCard } from '../models/interfaces/IWaifuCard';

class WaifuManager {
  public CARD: IWaifuCard = { name: '', decription: '', intialReply: '' };

  public PACK = '';

  public setWaifu(waifuCard: IWaifuCard, waifuPack: string) {
    this.CARD = structuredClone(waifuCard);
    this.PACK = `${waifuPack.trim()}`;
  }
}

export default new WaifuManager();
