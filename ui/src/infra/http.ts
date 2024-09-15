import { API_DOMAIN } from '../constants/network';
import {
  IChatSummaryResponse,
  IUsernameRequest,
  IWaifuGenerateRequest,
  IWaifuGenerateResponse,
  IWaifuSelectionRequest,
  IWaifuSelectionResponse,
} from '../interfaces/ApiRequests';

class Http {
  public async getUsername(): Promise<IUsernameRequest> {
    return (await fetch(`${API_DOMAIN}/username`)).json();
  }

  public async saveUsername(usernameRequest: IUsernameRequest): Promise<void> {
    await fetch(`${API_DOMAIN}/username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usernameRequest),
    });
  }

  public async getWaifus(): Promise<IWaifuSelectionResponse> {
    return (await fetch(`${API_DOMAIN}/waifu/pack`)).json();
  }

  public async selectWaifu(waifuSelectionRequest: IWaifuSelectionRequest): Promise<void> {
    await fetch(`${API_DOMAIN}/waifu/select`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(waifuSelectionRequest),
    });
  }

  public async getWaifuChat(): Promise<IChatSummaryResponse> {
    return (await fetch(`${API_DOMAIN}/chat`)).json();
  }

  public async deleteWaifuChat(): Promise<void> {
    await fetch(`${API_DOMAIN}/chat`, {
      method: 'DELETE',
    });
  }

  public async generateWaifuResponse(
    generateRequest: IWaifuGenerateRequest,
  ): Promise<IWaifuGenerateResponse> {
    return (await fetch(`${API_DOMAIN}/waifu/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(generateRequest),
    })).json();
  }
}

export default new Http();
