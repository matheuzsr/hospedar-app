import { SignUpService } from "~/server/service/supabase/sign/signup/SignUpService";
import { UserDto } from "~/server/service/supabase/sign";


export class SignUpController {
  private service = new SignUpService();
  public async register(user: UserDto) {
    return this.service.register(user);
  }
}
