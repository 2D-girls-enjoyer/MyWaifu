import ErrorSubType from './enum/errorSubType';
import ErrorType from './enum/errorType';

class InternalError extends Error {
  public errorType: ErrorType;

  public errorSubType: ErrorSubType;

  public constructor(errorType: ErrorType, errorSubType: ErrorSubType) {
    super();
    this.errorType = errorType;
    this.errorSubType = errorSubType;
    this.name = ErrorType[errorType];
  }
}

export default InternalError;
