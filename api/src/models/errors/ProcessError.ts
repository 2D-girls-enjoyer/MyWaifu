import ErrorSubType from './enum/errorSubType';
import ErrorType from './enum/errorType';
import InternalError from './internalError';

class ProcessError extends InternalError {
  public constructor(
    message: string,
    errorSubType: ErrorSubType,
  ) {
    super(ErrorType.PROCESS, errorSubType);
    this.message = message;
  }
}

export default ProcessError;
