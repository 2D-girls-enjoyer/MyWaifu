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
    const [waifuCard, username] = await Promise.all([
      waifuCardReader.readAsTxt(waifu),
      userManager.get(),
    ]);
    waifuManager.setWaifu(waifuCard, waifu);
    LLMPromptBuilder.load(waifuCard, username);
    await chatManager.load(waifu, waifuCard);
  }

  public async getAvailableWaifuPacks(): Promise<IWaifuPacksResponse> {
    return { waifus: await waifuPacksService.getAll() };
  }

  public async generate({ userReply }: IGenerateRequest): Promise<IGenerateResponse> {
    const replies = await chatManager.saveReply(
      userReply,
      await userManager.get(),
      waifuManager.PACK,
    );
    const waifuAnswer = await mainAIManager.generate(
      LLMPromptBuilder.buildChatPrompt(replies, waifuManager.CARD.name),
    );
    chatManager.saveReply(
      waifuAnswer,
      waifuManager.CARD.name,
      waifuManager.PACK,
    );

    return { response: waifuAnswer };
  }

  public async setUsername({ username }: ISetUsernameRequest): Promise<void> {
    userManager.create(username);
    await LLMPromptBuilder.load(waifuManager.CARD, username);
  }

  public async getUsername(): Promise<IUsernameResponse> {
    return { username: await userManager.get() };
  }

  public async getChat(): Promise<IChatSummaryResponse> {
    return { chatSummary: await chatManager.getReplies(waifuManager.PACK) };
  }
}

export default new ApiService();
