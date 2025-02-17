import { defineSafeEventHandler } from "~/server"
import { SignUpController } from "~/server/controller/SignUpController"

export default defineSafeEventHandler(async (event) => {
  const body = await readBody(event)
  const controller = new SignUpController()
  const response = controller.register(body)

  return response
})
