export interface IReply {
  sender: string,
  content: string,
  date?: string,
}

export interface IChatStorage {
  data: IReply[]
}
