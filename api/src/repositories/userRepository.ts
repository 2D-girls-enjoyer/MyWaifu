import resourcesConstants from '../configurations/resourcesConstants';
import fileUtils from '../utils/fileUtils';

class UserRepository {
  public async getUsername(): Promise<string> {
    try {
      return await fileUtils.read(resourcesConstants.DATA_PATH, 'username.txt', true);
    } catch (err) {
      console.log('Unable to read file, Error: ', err);
      throw err;
    }
  }

  public async setUsername(username: string): Promise<void> {
    await fileUtils.write(resourcesConstants.DATA_PATH, 'username.txt', username?.trim());
  }
}

export default new UserRepository();
