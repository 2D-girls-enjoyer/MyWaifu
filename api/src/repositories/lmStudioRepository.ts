import { fetch } from 'undici';
import { ILLMCompletionRequest, ILLMCompletionResponse } from '../models/interfaces/ILLMCompletion';
import externalResourcesConstants from '../configurations/externalResourcesConstants';

class LmStudioRepository {
  public async completion(request: ILLMCompletionRequest): Promise<ILLMCompletionResponse> {
    const response = await fetch(
      `${externalResourcesConstants.LM_STUDIO_URL}:${externalResourcesConstants.LM_STUDIO_PORT}/v1/completions`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(request),
      },
    );

    return response.json() as Promise<ILLMCompletionResponse>;
  }
}

export default new LmStudioRepository();
