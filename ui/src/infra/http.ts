import { API_DOMAIN } from '../constants';
import ErrorFetch from '../models/errors/errorFetch';
import {
  IChatSummaryResponse,
  IErrorResponse,
  IUsernameRequest,
  IWaifuGenerateRequest,
  IWaifuGenerateResponse,
  IWaifuSelectionRequest,
  IWaifuSelectionResponse,
} from '../models/interfaces/apiRequests';

class Http {
  public async getUsername(): Promise<IUsernameRequest> {
    return this.httpFetch('/username', 'GET');
  }

  public async saveUsername(usernameRequest: IUsernameRequest): Promise<void> {
    await this.httpFetch('/username', 'POST', usernameRequest);
  }

  public async getWaifus(): Promise<IWaifuSelectionResponse> {
    return this.httpFetch('/waifu/pack', 'GET');
  }

  public async selectWaifu(waifuSelectionRequest: IWaifuSelectionRequest): Promise<void> {
    await this.httpFetch('/waifu/select', 'POST', waifuSelectionRequest);
  }

  public async getWaifuChat(): Promise<IChatSummaryResponse> {
    return this.httpFetch('/chat', 'GET');
  }

  public async deleteWaifuChat(): Promise<void> {
    await this.httpFetch('/chat', 'DELETE');
  }

  public async generateWaifuResponse(
    generateRequest: IWaifuGenerateRequest,
  ): Promise<IWaifuGenerateResponse> {
    return this.httpFetch('/waifu/generate', 'POST', generateRequest);
  }

  private async httpFetch<T>(path: string, method: string, body?: object): Promise<T> {
    const response = await fetch(`${API_DOMAIN}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      throw new ErrorFetch((await response.json()) as IErrorResponse);
    }

    try {
      return await response.json();
    } catch (err: any) {
      return undefined as any;
    }
  }
}

export default new Http();
