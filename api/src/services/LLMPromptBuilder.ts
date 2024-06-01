import fs from 'fs';

class LLMPromptBuilder {
  private static readonly USER_ROLE = 'user';
  private static readonly SYSTEM_ROLE = 'system';

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

  public forWaifuRespondLastMessage(lastMessage: string) {

  }


  private buildSimplePrompt(role: string, msg: string) {
    return {role, content: msg};
  }
}

export default new LLMPromptBuilder();
