import { defineSafeEventHandler } from "~/server"
import { AmenityController } from "~/server/controller/AmenityController"

export default defineSafeEventHandler(async () => {
  const controller = new AmenityController()
  const response = await controller.getList()

  return response
})
