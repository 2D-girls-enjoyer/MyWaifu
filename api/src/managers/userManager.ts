import userRepository from '../repositories/userRepository';

class UserManager {
  private CURRENT_USERNAME: string | undefined = undefined;

  public async create(username: string): Promise<void> {
    await userRepository.setUsername(username);
    this.CURRENT_USERNAME = username;
  }

  public async get(): Promise<string> {
    if (!this.CURRENT_USERNAME) {
      this.CURRENT_USERNAME = await userRepository.getUsername();

      if (!this.CURRENT_USERNAME || this.CURRENT_USERNAME === '') {
        await this.create('User');
      }
    }

    return this.CURRENT_USERNAME;
  }
}

export default new UserManager();
