import fs from 'node:fs/promises';
import resourcesPlace from '../configurations/resourcesConstants';
import { ICorePrompt } from '../models/interfaces/ICorePrompt';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';
import { IReply } from '../models/interfaces/IReply';

class LLMPromptBuilder {
  private CHAT_PROMPT: string = '';

  private readonly MAX_CHAT_REPLY = 10;

  /**
 * Pre load prompt with waifu's name and descriptions to build prompt faster
 * @param {string} waifuCard Waifu Card
 * @returns {void}
 */
  public async load(waifuCard: IWaifuCard, username: string): Promise<void> {
    try {
      const corePrompt = await fs.readFile(resourcesPlace.LLM_PROMP_CORE_PATH, 'utf8');
      const { prompt } = JSON.parse(corePrompt) as ICorePrompt;
      this.CHAT_PROMPT = this.resolvePlaceholders(prompt, waifuCard, username);
    } catch (err) {
      if (err) {
        console.log(
          'Error while reading file for llm core prompt building configuration',
          err,
        );
      }
    }
  }

  /**
 * Build prompt for response on main chat
 * @param {IReply[]} chatHistory current chat
 * @returns {void}
 */
  public buildChatPrompt(chatHistory: IReply[], waifuName: string): string {
    const mostRecentReplies = chatHistory.length > this.MAX_CHAT_REPLY
      ? chatHistory.slice(-this.MAX_CHAT_REPLY)
      : chatHistory;
    let repliesPrompt = '';

    for (let i = 0; i < mostRecentReplies.length; i++) {
      repliesPrompt += `\n${mostRecentReplies[i].sender}: "${mostRecentReplies[i].content}"`;
    }

    return `${this.CHAT_PROMPT.replaceAll('{{lastMsg}}', repliesPrompt)}, ${waifuName} response:`;
  }

  private resolvePlaceholders(prompts: string, waifuCard: IWaifuCard, username: string): string {
    return prompts
      .replaceAll('{{waifu}}', waifuCard.name)
    // .replaceAll('{{user}}', username)
      .replaceAll('{{card_description}}', waifuCard.decription);
  }
}

export default new LLMPromptBuilder();
