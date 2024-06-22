// temporary process to get username
import userRepository from './repositories/userRepository';
import readline from 'readline';

if (!userRepository.getUsername()) {
  readline.createInterface({
    input: process.stdin,
    output:
  })
}

import express from 'express';

const app = express();

app.listen(process.env.PORT || 8686, () => {
  console.log(`Listening on port ${process.env.PORT || 8686}`);
});
