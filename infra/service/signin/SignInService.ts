import type { UserService } from '~/server/service/supabase/UserService'

export class SignInService {
  constructor(private userService?: UserService) { }
  public async login({ username, password }: { username: string, password: string }) {
    const { data } = await useFetch('/api/admin/signin', {
      method: 'POST',
      body: { username, password, profile: 'superadmin' }
    })
    const tokenCookie = useCookie('token')
    tokenCookie.value = data.value?.token

    return { error: false }
  }
}
