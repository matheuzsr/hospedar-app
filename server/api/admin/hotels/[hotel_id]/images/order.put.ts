import { defineSafeEventHandler } from "~/server"
import { HotelImageController } from "~/server/controller/HotelImageController"

const controller = new HotelImageController()
export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))
  const body = await readBody(event)
  const images = body?.images

  const response = await controller.updateOrder(hotelId, images)

  return response
})
