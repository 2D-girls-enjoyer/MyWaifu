import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import apiController from './apiController';
import loadedContextsValidator from '../validators/loadedContextsValidator';

const routes = Router();
routes.get('/waifu/pack', asyncHandler(apiController.getWaifuPacks));
routes.post('/waifu/select', asyncHandler(apiController.selectWaifu));
routes.post('/waifu/generate', loadedContextsValidator.validateLoadedContext, asyncHandler(apiController.generate));

routes.get('/username', asyncHandler(apiController.getUsername));
routes.post('/username', asyncHandler(apiController.setUsername));

routes.get('/chat', loadedContextsValidator.validateLoadedContext, asyncHandler(apiController.getChat));
routes.delete('/chat', loadedContextsValidator.validateLoadedContext, asyncHandler(apiController.deleteChat));

export default routes;
