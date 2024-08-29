import fs from 'node:fs/promises';
import resourcesPlace from '../configurations/resourcesConstants';
import { ICorePrompt } from '../models/interfaces/ICorePrompt';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';
import { IReply } from '../models/interfaces/IReply';

class LLMPromptBuilder {
  private CHAT_PROMPT: string = '';

  private readonly MAX_CHAT_REPLY = 9;

  /**
 * Pre load prompt with waifu's name and descriptions to build prompt faster
 * @param {string} waifuCard Waifu Card
 * @returns {void}
 */
  public async load(waifuCard: IWaifuCard): Promise<void> {
    try {
      const corePrompt = await fs.readFile(resourcesPlace.LLM_PROMP_CORE_PATH, 'utf8');
      const { prompt } = JSON.parse(corePrompt) as ICorePrompt;
      this.CHAT_PROMPT = this.resolveConstantPlaceholders(prompt, waifuCard);
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
  public buildChatPrompt(chatHistory: IReply[], waifuName: string, username: string): string {
    const mostRecentReplies = chatHistory.length > this.MAX_CHAT_REPLY
      ? chatHistory.slice(-this.MAX_CHAT_REPLY)
      : chatHistory;
    let repliesPrompt = '';

    for (let i = 0; i < mostRecentReplies.length; i++) {
      repliesPrompt += `\n${mostRecentReplies[i].sender !== waifuName ? username : waifuName}: "${mostRecentReplies[i].content}"`;
    }

    return `${this.CHAT_PROMPT.replace('{{lastMsg}}', repliesPrompt)}`;
  }

  // private methods

  private resolveConstantPlaceholders(prompts: string, waifuCard: IWaifuCard): string {
    let chatExample = '';

    waifuCard.chatExample
      ?.split(';')
      ?.forEach((value) => {
        const [sender, message] = value.split(':');
        chatExample += `\n${sender.trim()}: "${message.trim()}"`;
      });

    return this.resolveConditionals(prompts, waifuCard)
      .replaceAll('{{waifu}}', waifuCard.name)
      .replaceAll('{{card_description}}', waifuCard.decription)
      .replaceAll('{{chat_example}}', chatExample || '');
  }

  private resolveConditionals(prompts: string, waifuCard: IWaifuCard): string {
    return prompts.replaceAll(/<%[\s\S]*?%>/g, (match) => {
      const [condition, value] = match.slice(2, -2).split('|');
      let content: string | undefined;

      switch (condition.trim().split(' ')?.[1]) {
        case 'chat_example':
          if (waifuCard.chatExample) {
            content = value.trim();
          }
          break;
        case 'waifu':
          if (waifuCard.name) {
            content = value.trim();
          }
          break;
        case 'card_description':
          if (waifuCard.decription) {
            content = value.trim();
          }
          break;
        default:
          console.log('Invalid IF condition');
          break;
      }

      return content || '';
    });
  }
}

export default new LLMPromptBuilder();
