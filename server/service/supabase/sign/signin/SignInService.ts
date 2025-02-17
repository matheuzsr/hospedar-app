import jwt from 'jsonwebtoken'
import { PasswordHasherHelper } from '~/server/helper/PasswordHasherHelper'
import { ForbiddenError, UnauthorizedError, ValidationError } from '~/server/errors/errors'
import type { UserDto, UserService } from '../../UserService'

export class SignInService {
  constructor(private userService: UserService) { }
  public async login(user: UserDto): Promise<{ token: string }> {
    try {
      const validUser = await this.getValidUser(user)

      return { token: this.generateToken(validUser) }
    } catch (error: any) {
      console.error('Error on login', error)
      throw new UnauthorizedError('Nome de usuário ou senha incorreta')
    }
  }

  private async getValidUser(user: UserDto): Promise<UserDto> {
    const existingUser = await this.userService.getUser(user)
    const isValidPassword = await PasswordHasherHelper.verifyPassword(user.password || '', existingUser.encoded_password)
    if (!isValidPassword) throw new ForbiddenError('Senha incorreta')

    return { id: existingUser.id, username: existingUser.username, profile: existingUser.profile }
  }

  generateToken(user: UserDto): string {
    const userInformation = { userId: user.id, username: user.username, profile: user.profile }
    const jwtSecret = useRuntimeConfig().jwtSecret

    return jwt.sign(userInformation, jwtSecret, { expiresIn: '24h' })
  }

  public validateToken(token: string): boolean {
    const jwtSecret = useRuntimeConfig().jwtSecret

    try {
      const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload
      const currentTime = Math.floor(Date.now() / 1000)
      if (decoded.exp && decoded.exp < currentTime) return false

      return !!decoded
    } catch (error: any) {
      console.error('Erro ao validar o token', error)
      throw new ValidationError('Erro ao validar o token')

      return false
    }
  }
}
