export interface ILLMCompletionRequest {
  model: string,
  prompt: string,
  stream: boolean,
  max_tokens: number,
  temperature: number,
}

export interface ILLMChoice {
  text: string,
}

export interface ILLMCompletionResponse {
  choices: ILLMChoice[]
}

export interface IGeneratedCompletion {
  response: string,
  waifuPack: string,
  waifuName: string,
}
