import { defineSafeEventHandler } from "~/server"
import { AmenityController } from "~/server/controller/AmenityController"

export default defineSafeEventHandler(async (event) => {
  const body = await readBody(event)
  const controller = new AmenityController()
  const response = await controller.createOrEdit(body.name)

  return response
})
