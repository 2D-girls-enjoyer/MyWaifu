import { NextFunction, Request, Response } from 'express';
import InternalError from '../../models/errors/internalError';
import AIConnectionError from '../../models/errors/aiConnectionError';
import { IErrorResponse } from '../../models/interfaces/IApiResponse';
import ErrorSubType from '../../models/errors/enum/errorSubType';

class ErrorHandlerController {
  public handle(err: InternalError, req: Request, res: Response, _next: NextFunction) {
    if (err?.errorType) {
      const response = ErrorHandlerController.handleMappedError(err);
      return res.status(response.code).send(response);
    }

    return res.status(500).send({ code: 500, errorName: 'UNKNOWN', message: '' });
  }

  private static handleMappedError(err: AIConnectionError): IErrorResponse {
    let code: number;

    switch (err.errorSubType) {
      case ErrorSubType.CONNECTION_REFUSED:
        code = 400;
        break;
      case ErrorSubType.IRREGULAR_LOADED_MODEL_QUANTITY:
        code = 404;
        break;
      case ErrorSubType.UNKNOWN_LLM_SOURCE_ERROR:
        code = 500;
        break;
      case ErrorSubType.WAIFU_NOT_SELECTED:
        code = 400;
        break;
      default:
        code = 500;
    }

    return {
      code,
      errorName: ErrorSubType[err.errorSubType],
      message: err.message,
    };
  }
}

export default new ErrorHandlerController();
