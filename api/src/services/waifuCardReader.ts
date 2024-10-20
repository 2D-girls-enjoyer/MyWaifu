import fs from 'fs/promises';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';
import resourcesPlace from '../configurations/resourcesConstants';

class WaifuCardReader {
  public async readFromTxt(waifuPack: string): Promise<IWaifuCard> {
    const regexToGetBetweenBracket = /\[(.*?)\]/g;
    const content = await fs.readFile(
      `${resourcesPlace.WAIFU_PACK_COLLECTION_PATH}/${waifuPack}/card.txt`,
      'utf-8',
    );
    const waifuCard: IWaifuCard = {
      name: '',
      decription: '',
      intialReply: '',
      chatExample: '',
    };

    waifuCard.name = regexToGetBetweenBracket.exec(content)?.[1]?.trim() || '';

    if (waifuCard.name === '') {
      console.log('Waifu name not found. Check the card txt');
      throw new Error('Waifu name was not given');
    }

    waifuCard.decription = regexToGetBetweenBracket.exec(content)?.[1]?.trim() || '';

    if (waifuCard.decription === '') {
      console.log('Waifu description not found. Check the card txt');
      throw new Error('Waifu description was not given');
    }

    waifuCard.intialReply = regexToGetBetweenBracket.exec(content)?.[1]?.trim() || '';

    if (waifuCard.intialReply === '') {
      console.log('Waifu initial reply not found. Check the card txt');
      throw new Error('Waifu initial reply was not given');
    }

    waifuCard.chatExample = regexToGetBetweenBracket.exec(content)?.[1] || '';

    return waifuCard;
  }
}

export default new WaifuCardReader();
