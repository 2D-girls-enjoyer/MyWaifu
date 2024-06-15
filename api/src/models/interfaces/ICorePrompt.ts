export interface ICorePromptPlaceholder {
  [placeholder: string]: string,
}
export interface ICorePrompt {
  prompt: string,
  waifu: string,
  placeholders: ICorePromptPlaceholder,
};
