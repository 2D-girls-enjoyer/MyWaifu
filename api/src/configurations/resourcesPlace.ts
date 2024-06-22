import path from 'path';

class ResourcesPlace {
  public LLM_PROMP_CORE_PATH: string;

  public WAIFU_CARD_COLLECTION_PATH: string;

  public constructor() {
    this.LLM_PROMP_CORE_PATH = path.resolve('../../prompts/core-prompt.json');
    this.WAIFU_CARD_COLLECTION_PATH = path.resolve('../../../waifus');
  }
}

export default new ResourcesPlace();
