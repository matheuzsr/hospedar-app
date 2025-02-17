import { supabase } from '~/infra/SupabaseAdapter'
import { PasswordHasherHelper } from '~/server/helper/PasswordHasherHelper'
import type { UserDto } from '..'
import { ConflictError, InternalServerError } from '~/server/errors'

export class SignUpService {
  public async register(user: UserDto): Promise<UserDto> {
    if (await this.existUser(user.username)) throw new ConflictError(`Username ${user.username} já existe`)
    const encodedPassword = await PasswordHasherHelper.getHash(user?.password || '')
    const { error, data } = await supabase
      .from('users')
      .insert([{ username: user.username, encoded_password: encodedPassword, profile: user.profile }])
      .select()
      .single()

    if (error) throw new InternalServerError('Erro ao criar usuário')

    return { id: data.id, username: data.username, profile: data.profile }
  }

  private async existUser(username: string): Promise<boolean> {
    const user = await supabase.from('users').select('*').eq('username', username)

    return !!user.data?.length
  }
}
