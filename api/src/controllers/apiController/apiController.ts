import { Request, Response } from 'express';
import apiService from '../../services/apiService';

class ApiController {
  public async selectWaifu(req: Request, res: Response) {
    res.send(await apiService.selectWaifu(req.body));
  }

  public async getWaifuPacks(req: Request, res: Response) {
    res.send(await apiService.getAvailableWaifuPacks());
  }

  public async generate(req: Request, res: Response) {
    res.send(await apiService.generate(req.body));
  }

  public async setUsername(req: Request, res: Response) {
    res.send(await apiService.setUsername(req.body));
  }

  public async getUsername(req: Request, res: Response) {
    res.send(await apiService.getUsername());
  }

  public async getChat(req: Request, res: Response) {
    res.send(await apiService.getChat());
  }
}

export default new ApiController();
