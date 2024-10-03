import ErrorSubType from './enum/errorSubType';
import ErrorType from './enum/errorType';
import InternalError from './internalError';

class AIConnectionError extends InternalError {
  public constructor(
    message: string,
    errorSubType: ErrorSubType,
  ) {
    super(ErrorType.AI_CONNECTION, errorSubType);
    this.message = message;
  }
}

export default AIConnectionError;
