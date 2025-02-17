import { supabase } from "~/infra/SupabaseAdapter"
import { NotFoundError } from "~/server/errors/errors"

export type ProfileType = 'superadmin' | 'admin' | 'user';

export interface UserDto {
  id?: number;
  username: string;
  password?: string;
  encodedPassword?: string;
  profile?: ProfileType;
}

export class UserService {
  async getUser(user: UserDto) {
    const { data, error } = await supabase.from('users').select()
      .eq('username', user.username)
      .eq('profile', user.profile)
      .single()
    if (error) throw new NotFoundError('Usuário não encontrado')

    return data
  }

  public async create(user: UserDto): Promise<UserDto> {
    const userToCreate = { username: user.username || null, profile: user.profile || null, encoded_password: user.encodedPassword || null }
    const { error, data } = await supabase.from('users').insert([userToCreate]).select().single()
    if (error) throw new Error('Erro ao criar usuário')

    return { id: data.id, username: data.username, profile: data.profile }
  }
}
