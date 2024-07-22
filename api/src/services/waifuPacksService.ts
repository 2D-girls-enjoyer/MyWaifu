import fs from 'fs/promises';
import resourcesPlace from '../configurations/resourcesConstants';

class WaifuPackService {
  public async getAll(): Promise<string[]> {
    const availablePack: string[] = [];

    (await fs.readdir(resourcesPlace.WAIFU_CARD_COLLECTION_PATH, { withFileTypes: true }))
      .forEach((item) => {
        if (item.isDirectory()) {
          availablePack.push(item.name);
        }
      });

    return availablePack;
  }
}

export default new WaifuPackService();
