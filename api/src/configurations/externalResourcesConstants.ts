class ExternalResourcesConstants {
  public LM_STUDIO_URL: string;

  public LM_STUDIO_PORT: string;

  constructor() {
    this.LM_STUDIO_URL = 'http://localhost';
    this.LM_STUDIO_PORT = '1234';
  }
}

export default new ExternalResourcesConstants();
