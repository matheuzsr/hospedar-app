import { defineSafeEventHandler } from "~/server"
import { HotelImageController } from "~/server/controller/HotelImageController"

const controller = new HotelImageController()
export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))
  
  if (!hotelId) throw createError({ statusCode: 422, message: 'Hotel ID is required' })
  const response = await controller.getList(hotelId)

  return response
})
