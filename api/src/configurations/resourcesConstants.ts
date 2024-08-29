import path from 'path';

class ResourcesConstants {
  public LLM_PROMP_CORE_PATH: string;

  public WAIFU_PACK_COLLECTION_PATH: string;

  public readonly DATA_PATH: string;

  public constructor() {
    this.LLM_PROMP_CORE_PATH = path.resolve(__dirname, '../../prompts/core-prompt.json');
    this.WAIFU_PACK_COLLECTION_PATH = path.resolve(__dirname, '../../../waifus');
    this.DATA_PATH = path.resolve(__dirname, '../../data');
  }
}

export default new ResourcesConstants();
