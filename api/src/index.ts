import express from 'express';
import cors from 'cors';
import apiRouter from './controllers/apiController/routes';

express()
  .use(cors())
  .use(express.json())
  .use(apiRouter)
  .listen(process.env.PORT || 8686, () => {
    console.log(`Listening on port ${process.env.PORT || 8686}`);
  });
