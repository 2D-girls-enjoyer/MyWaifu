import {
  IGenerateRequest,
  ISetUsernameRequest,
  IWaifuSelectionRequest,
} from '../models/interfaces/IApiRequest';
import chatManager from '../managers/chatManager';
import LLMPromptBuilder from '../managers/LLMPromptBuilder';
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
    const waifuCard = await waifuCardReader.readAsTxt(waifu);
    waifuManager.setWaifu(waifuCard, waifu);

    LLMPromptBuilder.load(waifuManager.CARD, await userManager.get());
    await chatManager.load(waifu, waifuCard);
  }

  public async getAvailableWaifuPacks(): Promise<IWaifuPacksResponse> {
    return { waifus: await waifuPacksService.getAll() };
  }

  public async generate({ userReply }: IGenerateRequest): Promise<IGenerateResponse> {
    const replies = await chatManager.saveReply(
      userReply,
      waifuManager.PACK,
    );
    const waifuAnswer = await mainAIManager.generate(
      LLMPromptBuilder.buildChatPrompt(replies, waifuManager.CARD.name, await userManager.get()),
    );
    chatManager.saveReply(
      waifuAnswer,
      waifuManager.PACK,
      waifuManager.CARD.name,
    );

    return { response: waifuAnswer };
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
