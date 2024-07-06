import express from 'express';

const app = express();

app.listen(process.env.PORT || 8686, () => {
  console.log(`Listening on port ${process.env.PORT || 8686}`);
});
