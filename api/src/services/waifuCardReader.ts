import fs from 'fs';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';
import resourcesPlace from '../configurations/resourcesPlace';

class WaifuCardReader {
  public readAsTxt(waifu: string): IWaifuCard {
    const regexToGetBetweenBracket = /\[(.*?)\]/g;
    const content = fs.readFileSync(`${resourcesPlace.WAIFU_CARD_COLLECTION_PATH}/${waifu}/card.txt`, 'utf-8');
    const waifuCard: IWaifuCard = {
      name: '',
      decription: '',
      chatExample: undefined,
    };

    waifuCard.name = regexToGetBetweenBracket.exec(content)?.[1] || '';

    if (waifuCard.name === '') {
      console.log('Waifu name not found\nCheck the card txt');
      throw new Error('Waifu name was not given')
    }

    waifuCard.decription = regexToGetBetweenBracket.exec(content)?.[1] || '';

    if (waifuCard.decription === '') {
      console.log('Waifu description not found\nCheck the card txt');
      throw new Error('Waifu description was not given')
    }

    waifuCard.chatExample = regexToGetBetweenBracket.exec(content)?.[1];

    return waifuCard;
  }
}

export default new WaifuCardReader();
