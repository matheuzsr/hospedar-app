import { SignUpController } from "~/server/controller/SignUpController";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const controller = new SignUpController();
  const response = controller.register(body);

  return response
})
