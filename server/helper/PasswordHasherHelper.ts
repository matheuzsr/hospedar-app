import bcrypt from 'bcrypt'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PasswordHasherHelper {
  static async getHash(password: string, saltRounds = 10) {
    return await bcrypt.hash(password, saltRounds)
  }

  static async verifyPassword(inputPassword: string, hashedPassword: string) {
    return await bcrypt.compare(inputPassword, hashedPassword)
  }
}
