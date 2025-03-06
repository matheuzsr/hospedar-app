import { defineSafeEventHandler } from "~/server"
import { HotelImageController } from "~/server/controller/HotelImageController"

const controller = new HotelImageController()
export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))
  const body = await readBody(event)
  const path = body?.path
  
  if (!hotelId || !path) throw createError({ statusCode: 422, message: 'Hotel ID is required' })
  const response = await controller.delete(hotelId, path)

  return response
})
