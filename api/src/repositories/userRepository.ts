import fs from 'fs';

class UserRepository {
  public getUsername(): string {
    try {
      return fs.readFileSync('../../data/username.txt', 'utf-8');
    } catch (err) {
      console.log('Unable to read file, Error: ', err);
      throw err;
    };
  }
}

export default new UserRepository();
