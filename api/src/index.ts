import express from 'express';
import cors from 'cors';
import apiRouter from './controllers/apiController/routes';
import resourcesConstants from './configurations/resourcesConstants';

express()
  .use(cors())
  .use(express.json())
  .use('/static', express.static(
    resourcesConstants.WAIFU_PACK_COLLECTION_PATH,
    {
      maxAge: '30d',
      etag: true,
      lastModified: true,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=2592000');
      },
    },
  ))
  .use(apiRouter)
  .listen(process.env.PORT || 8686, () => {
    console.log(`Listening on port ${process.env.PORT || 8686}`);
  });
