import { SignInService } from "~/server/service/supabase/sign/signin/SignInService"
import type { UserDto } from "../service/supabase/sign"

export class SignInController {
  private service = new SignInService()
  public async login(user: UserDto) {
    return this.service.login(user)
  }

  public async validToken(token: string) {
    return this.service.validateToken(token)
  }
}
