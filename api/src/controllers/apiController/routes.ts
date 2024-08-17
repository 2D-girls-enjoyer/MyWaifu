import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import apiController from './apiController';

const routes = Router();
routes.get('/waifu/pack', asyncHandler(apiController.getWaifuPacks));
routes.post('/waifu/select', asyncHandler(apiController.selectWaifu));
routes.post('/waifu/generate', asyncHandler(apiController.generate));

routes.get('/username', asyncHandler(apiController.getUsername));
routes.post('/username', asyncHandler(apiController.setUsername));

routes.get('/chat', asyncHandler(apiController.getChat));

export default routes;
