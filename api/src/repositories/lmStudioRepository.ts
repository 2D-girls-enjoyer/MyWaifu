import { fetch } from 'undici'
import { ILLMCompletionRequest } from '../models/interfaces/ILLMCompletionRequest';
import externalResourcesPlace from '../configurations/externalResourcesPlace';

class LmStudioRepository {
  public async completion(request: ILLMCompletionRequest) {
    return fetch(
      `${externalResourcesPlace.LM_STUDIO_URL}:${externalResourcesPlace.LM_STUDIO_PORT}/v1/completions`,
      {
        method: 'POST',
        body: JSON.stringify(prompt)
      }
    );
  }
}

export default new LmStudioRepository();
