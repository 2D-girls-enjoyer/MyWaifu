import LmStudioRepository from '../repositories/LmStudioRepository';

class MainAIManager {
  public async generate(prompt: string): Promise<string> {
    const completion = await LmStudioRepository.completion({
      max_tokens: -1,
      model: '',
      stream: false,
      prompt,
      temperature: 0.7,
    });

    return this.sanitizeResponse(completion.choices[0].text);
  }

  private sanitizeResponse(completionText: string): string {
    const regexToGetBetweenQuotes = /".*?"/;
    return regexToGetBetweenQuotes.exec(completionText)?.[1] || '';
  }
}

export default new MainAIManager();
