import fs from 'fs';
import { ICorePromptPlaceholder } from '../models/interfaces/ICorePrompt';

class LLMPromptBuilder {
  private readonly PROMPT: string;
  public constructor() {
    fs.readFile(process.env.LLM_PROMP_CONFIG as string, 'utf8', (err, data) => {
      if (err) {
        console.log(
            'Error while reading file for llm prompt building configuration',
            err,
        );
      }

      JSON.parse(data);
    });
  }
  private static resolvePlaceholders(placeholders: ICorePromptPlaceholder) {

  }

  public forWaifuRespondLastMessage(lastMessage: string) {

  }


  private buildSimplePrompt(role: string, msg: string) {
    return {role, content: msg};
  }
}

export default new LLMPromptBuilder();
