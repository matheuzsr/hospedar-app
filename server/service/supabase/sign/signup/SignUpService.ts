import { PasswordHasherHelper } from '~/server/helper/PasswordHasherHelper'
import { ConflictError, NotFoundError } from '~/server/errors/errors'
import type { UserDto, UserService } from '../../UserService'

export class SignUpService {
  constructor(private userService: UserService) { }

  public async register(user: UserDto): Promise<UserDto | undefined> {
    if (await this.existUser(user)) throw new ConflictError('Usuário já existe')

    const encodedPassword = await PasswordHasherHelper.getHash(user?.password || '')
    const userCreated = await this.userService.create({ ...user, encodedPassword })

    return { id: userCreated.id, username: userCreated.username, profile: userCreated.profile }
  }

  private async existUser(user: UserDto) {
    try {
      const existingUser = await this.userService.getUser(user)

      return !!existingUser
    } catch (error: any) {
      if (error instanceof NotFoundError) return false
    }
  }
}
