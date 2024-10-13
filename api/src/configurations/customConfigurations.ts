class CustomConfigurations {
  public REPLIES_MAX_AMOUNT_SAVE: number;

  public LLM_MAX_BLANK_RETRY: number;

  public constructor() {
    this.REPLIES_MAX_AMOUNT_SAVE = 800;
    this.LLM_MAX_BLANK_RETRY = 3;
  }
}

export default new CustomConfigurations();
