import { defineSafeEventHandler } from "~/server"
import { HotelController } from "~/server/controller/HotelController"

export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))

  const controller = new HotelController()
  await controller.delete(hotelId)

  return { success: true, message: "Hotel delete successfully" }
})
