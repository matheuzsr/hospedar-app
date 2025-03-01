import { defineSafeEventHandler } from "~/server"
import { HotelAmenityController } from "~/server/controller/HotelAmenityController"
import type { HotelAmenityDto } from "~/server/service/supabase/HotelAmenityService"

export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))
  const body = await readBody(event)
  const hotelAmenity = { hotelId, name: body.name, optional: body.optional } as HotelAmenityDto

  const controller = new HotelAmenityController()
  const response = await controller.create(hotelAmenity)

  return response
})
