import { defineSafeEventHandler } from "~/server"
import { HotelAmenityController } from "~/server/controller/HotelAmenityController"

export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))
  
  const controller = new HotelAmenityController()
  const response = await controller.get(hotelId)

  return response
})
