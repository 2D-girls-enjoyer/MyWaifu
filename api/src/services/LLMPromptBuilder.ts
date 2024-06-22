import fs from 'fs';
import resourcesPlace from '../configurations/resourcesPlace';
import { ICorePrompt, ICorePromptPlaceholder } from '../models/interfaces/ICorePrompt';

class LLMPromptBuilder {
  private PROMPT: string;

  public loadWaifu(waifu: string): void {


    fs.readFile(resourcesPlace.LLM_PROMP_CORE_PATH, 'utf8', (err, data) => {
      if (err) {
        console.log(
          'Error while reading file for llm core prompt building configuration',
          err,
        );
        return;
      }

      const { prompt } = JSON.parse(data) as ICorePrompt;
      this.resolvePlaceholders(prompt);
    });
  }


  private resolvePlaceholders(placeholders: ICorePromptPlaceholder) {
  }

  public forWaifuRespondLastMessage(lastMessage: string) {

  }
}

export default new LLMPromptBuilder();
