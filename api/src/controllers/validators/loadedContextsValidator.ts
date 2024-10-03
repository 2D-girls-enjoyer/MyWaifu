import { Request, Response, NextFunction } from 'express';
import waifuManager from '../../managers/waifuManager';
import ProcessError from '../../models/errors/ProcessError';
import ErrorSubType from '../../models/errors/enum/errorSubType';

class LoadedContextValidator {
  public async validateLoadedContext(req: Request, res: Response, next: NextFunction) {
    if (!waifuManager.PACK || waifuManager.PACK === '') {
      next(new ProcessError('Operation must have a waifu loaded', ErrorSubType.WAIFU_NOT_SELECTED));
    }

    next();
  }
}

export default new LoadedContextValidator();
