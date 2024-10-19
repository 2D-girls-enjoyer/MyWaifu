import { fetch } from 'undici';
import { ILLMCompletionRequest, ILLMCompletionResponse } from '../models/interfaces/ILLMCompletion';
import externalResourcesConstants from '../configurations/externalResourcesConstants';
import AIConnectionError from '../models/errors/aiConnectionError';
import ErrorSubType from '../models/errors/enum/errorSubType';

class LmStudioRepository {
  public async completion(request: ILLMCompletionRequest): Promise<ILLMCompletionResponse> {
    let response;

    try {
      response = await fetch(
        `${externalResourcesConstants.LM_STUDIO_URL}:${externalResourcesConstants.LM_STUDIO_PORT}/v1/completions`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(request),
        },
      );

      if (!response.ok) {
        switch (response.status) {
          case 404:
            throw new AIConnectionError(
              'LmStudio cannot be loaded with more or less then 1 (one) model only',
              ErrorSubType.IRREGULAR_LOADED_MODEL_QUANTITY,
            );
          default:
            throw new AIConnectionError(
              'An unexpected error occured at LmStudio',
              ErrorSubType.UNKNOWN_LLM_SOURCE_ERROR,
            );
        }
      }
    } catch (err: any) {
      if (err instanceof TypeError) {
        throw new AIConnectionError(
          'LmStudio server could not be reached',
          ErrorSubType.CONNECTION_REFUSED,
        );
      }

      throw err;
    }

    return response.json() as Promise<ILLMCompletionResponse>;
  }
}

export default new LmStudioRepository();
