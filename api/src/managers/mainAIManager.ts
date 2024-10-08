/* eslint-disable no-await-in-loop */
import customConfigurations from '../configurations/customConfigurations';
import { IGeneratedCompletion } from '../models/interfaces/ILLMCompletion';
import LmStudioRepository from '../repositories/lmStudioRepository';

class MainAIManager {
  private readonly DEFAULT_CHAT_TEMPERATURE = 0.7;

  public async generate(
    prompt: string,
    waifuPack: string,
    waifuName: string,
  ): Promise<IGeneratedCompletion> {
    const currentWaifuPack = waifuPack;
    const currentWaifuName = waifuName;
    let response = this.sanitizeResponse((
      await this.generateCompletion(prompt, this.DEFAULT_CHAT_TEMPERATURE)
    ).choices[0].text);

    if (response === '') {
      response = await this.forceNotBlankResponse(prompt, this.DEFAULT_CHAT_TEMPERATURE);
    }

    return {
      response,
      waifuPack: currentWaifuPack,
      waifuName: currentWaifuName,
    };
  }

  private async generateCompletion(prompt: string, temperature: number) {
    return LmStudioRepository.completion({
      max_tokens: 120,
      model: '',
      stream: false,
      prompt,
      temperature,
    });
  }

  private async forceNotBlankResponse(prompt: string, temperature: number): Promise<string> {
    let count = 0;
    let currentTemperature = temperature;
    let response = '';
    const deltaTemperature = 0.1;

    while (count < customConfigurations.LLM_MAX_BLANK_RETRY && response === '') {
      console.log(`Attempting another chat completion ${count + 1} of ${customConfigurations.LLM_MAX_BLANK_RETRY}`);

      currentTemperature -= deltaTemperature;

      response = this.sanitizeResponse((
        await this.generateCompletion(prompt, currentTemperature)
      ).choices[0].text);
      count++;
    }

    return response;
  }

  private sanitizeResponse(completionText: string): string {
    const regexToGetBetweenQuotes = /"([^"]*)"/;

    return regexToGetBetweenQuotes.exec(completionText)?.[1]?.trim() || '';
  }
}

export default new MainAIManager();
