import { defineSafeEventHandler } from "~/server"
import { SignInController } from "~/server/controller/SignInController"

export default defineSafeEventHandler(async (event) => {
  const body = await readBody(event)
  const controller = new SignInController()
  const response = await controller.login(body)

  return response
})
