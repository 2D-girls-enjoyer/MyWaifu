import fs from 'fs';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';
import resourcesPlace from '../configurations/resourcesPlace';

class WaifuCardReader {
  public readAsTxt(waifu: string): IWaifuCard {
    const regexToGetBetweenBracket = /\[(.*?)\]/g;
    const content = fs.readFileSync(`${resourcesPlace.WAIFU_CARD_COLLECTION_PATH}/${waifu}/`, 'utf-8');
    const waifuCard: IWaifuCard = {
      name: '',
      decription: '',
      chatExample: undefined,
    };

    waifuCard.name = regexToGetBetweenBracket.exec(content)?.[1] || '';

    if (waifuCard.name === '') {
      console.log('waifu name not found\nCheck the card txt');

    }

    waifuCard.decription = regexToGetBetweenBracket.exec(content)?.[1] || '';
    waifuCard.chatExample = regexToGetBetweenBracket.exec(content)?.[1];

    return waifuCard;
  }
}

export default new WaifuCardReader();
