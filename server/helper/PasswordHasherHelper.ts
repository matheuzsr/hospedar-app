import bcrypt from 'bcrypt';

export class PasswordHasherHelper {
  static async getHash(password: string, saltRounds = 10) {
    return await bcrypt.hash(password, saltRounds);
  }

  static async verifyPassword(inputPassword: string, hashedPassword: string) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
