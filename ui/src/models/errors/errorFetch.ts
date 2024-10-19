import { IErrorResponse } from '../interfaces/apiRequests';
import { ErrorName } from './enum/errorName';

class ErrorFetch extends Error {
  public code: number;

  public errorName: ErrorName;

  public constructor(errorResponse: IErrorResponse) {
    super();
    this.code = errorResponse?.code;
    this.errorName = errorResponse?.errorName;
    this.message = errorResponse?.message;
  }
}

export default ErrorFetch;
