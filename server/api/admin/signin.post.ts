import { SignInService } from "~/server/service/supabase/sign/signin/SignInService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const service = new SignInService();
  const response = await service.login(body);

  return response
})
