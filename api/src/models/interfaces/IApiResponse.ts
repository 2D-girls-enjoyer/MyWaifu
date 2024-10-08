import { IReply } from './IReply';

export interface IGenerateResponse {
  response: string
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
