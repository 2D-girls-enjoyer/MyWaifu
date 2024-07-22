import userRepository from '../repositories/userRepository';

class UserManager {
  private CURRENT_USERNAME: string | undefined = undefined;

  public async create(username: string): Promise<void> {
    userRepository.setUsername(username);
    this.CURRENT_USERNAME = username;
  }

  public async get(): Promise<string> {
    if (!this.CURRENT_USERNAME) {
      this.CURRENT_USERNAME = await userRepository.getUsername();
      this.setDefaultUsernameIfNecessary();
    }

    return this.CURRENT_USERNAME;
  }

  private async setDefaultUsernameIfNecessary() {
    if (!this.CURRENT_USERNAME || this.CURRENT_USERNAME === '') {
      this.CURRENT_USERNAME = 'User';
      this.create(this.CURRENT_USERNAME);
    }
  }
}

export default new UserManager();
