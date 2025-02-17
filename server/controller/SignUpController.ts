import { SignUpService } from "~/server/service/supabase/sign/signup/SignUpService"
import type { UserDto } from "../service/supabase/UserService"
import { UserService } from "../service/supabase/UserService"

export class SignUpController {
  private service = new SignUpService(new UserService)
  public async register(user: UserDto) {
    return this.service.register(user)
  }
}
