import { ErrorName } from '../errors/enum/errorName';

export interface IUsernameResponse {
  username: string;
}

export interface IUsernameRequest {
  username: string;
}

export interface IWaifuSelectionResponse {
  waifus: string[];
}

export interface IReply {
  sender: string;
  content: string;
  date?: string;
}

export interface IChatSummaryResponse {
  chatSummary: IReply[];
}

export interface IWaifuSelectionRequest {
  waifu: string;
}

export interface IWaifuGenerateRequest {
  userReply: string;
}

export interface IWaifuGenerateResponse {
  waifuPack: string;
  response: string;
}

export interface IErrorResponse {
  code: number;
  errorName: ErrorName;
  message: string;
}
