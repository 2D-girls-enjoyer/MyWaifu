import fs from 'fs';
import resourcesPlace from '../configurations/resourcesPlace';
import { ICorePrompt } from '../models/interfaces/ICorePrompt';
import waifuCardReader from './waifuCardReader';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';

class LLMPromptBuilder {
  private CHAT_PROMPT: string;

  public preLoadWaifu(waifu: string): void {
    const waifuCard = waifuCardReader.readAsTxt(waifu);

    fs.readFile(resourcesPlace.LLM_PROMP_CORE_PATH, 'utf8', (err, data) => {
      if (err) {
        console.log(
          'Error while reading file for llm core prompt building configuration',
          err,
        );
        return;
      }

      const { prompt } = JSON.parse(data) as ICorePrompt;
      this.CHAT_PROMPT = this.resolvePlaceholders(prompt, waifuCard);
    });
  }

  public buildChatPrompt() {
    
  }

  private resolvePlaceholders(prompts: string, waifuCard: IWaifuCard): string {
    return prompts
    .replaceAll('{{waifu}}', waifuCard.name)
    .replaceAll('{{card_description}}', waifuCard.decription);
  }
}

export default new LLMPromptBuilder();
