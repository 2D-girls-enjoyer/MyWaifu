import {
  IGenerateRequest,
  ISetUsernameRequest,
  IWaifuSelectionRequest,
} from '../models/interfaces/IApiRequest';
import chatManager from '../managers/chatManager';
import LLMPromptManager from '../managers/llmPromptManager';
import mainAIManager from '../managers/mainAIManager';
import userManager from '../managers/userManager';
import waifuCardReader from './waifuCardReader';
import waifuPacksService from './waifuPacksService';
import waifuManager from '../managers/waifuManager';
import {
  IChatSummaryResponse, IGenerateResponse, IUsernameResponse, IWaifuPacksResponse,
} from '../models/interfaces/IApiResponse';

class ApiService {
  public async selectWaifu({ waifu }: IWaifuSelectionRequest): Promise<void> {
    const waifuCard = await waifuCardReader.readFromTxt(waifu);
    waifuManager.setWaifu(waifuCard, waifu);

    await Promise.all([
      LLMPromptManager.load(waifuManager.CARD, await userManager.get()),
      chatManager.load(waifu, waifuCard)
    ]);    
  }

  public async generate({ userReply }: IGenerateRequest): Promise<IGenerateResponse> {
    const { response, waifuPack, waifuName } = await mainAIManager.generate(
      LLMPromptManager.buildChatPrompt(
        await chatManager.saveReply(
          userReply,
          waifuManager.PACK,
        ),
        waifuManager.CARD.name,
        await userManager.get(),
      ),
      waifuManager.PACK,
      waifuManager.CARD.name,
    );
    await chatManager.saveReply(
      response,
      waifuPack,
      waifuName,
    );

    return { response, waifuPack };
  }

  public async getAvailableWaifuPacks(): Promise<IWaifuPacksResponse> {
    return { waifus: await waifuPacksService.getAll() };
  }

  public async setUsername({ username }: ISetUsernameRequest): Promise<void> {
    await userManager.create(username);
  }

  public async getUsername(): Promise<IUsernameResponse> {
    return { username: await userManager.get() };
  }

  public async getChat(): Promise<IChatSummaryResponse> {
    return { chatSummary: await chatManager.getReplies(waifuManager.PACK) };
  }

  public async deleteChat(): Promise<void> {
    await chatManager.deleteAllReplies(waifuManager.PACK);
    await chatManager.load(waifuManager.PACK, waifuManager.CARD);
  }
}

export default new ApiService();
