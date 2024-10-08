import { IReply } from './IReply';

export interface IGenerateResponse {
  waifuPack: string;
  response: string;
}

export interface IWaifuPacksResponse {
  waifus: string[]
}

export interface IUsernameResponse {
  username: string
}

export interface IChatSummaryResponse {
  chatSummary: IReply[]
}

export interface IErrorResponse {
  code: number;
  errorName: string;
  message: string;
}
