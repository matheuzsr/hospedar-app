import { defineSafeEventHandler } from "~/server"
import { HotelImageController } from "~/server/controller/HotelImageController"

const controller = new HotelImageController()
export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))
  const multiPartData = await readMultipartFormData(event)
  
  const name = multiPartData?.[1].data.toString()
  const fileName = `${Date.now()}-${name}`
  if (!multiPartData || multiPartData.length === 0) {
    throw createError({ statusCode: 422, message: 'No file uploaded' })
  }

  const response = await controller.upload(hotelId, fileName, multiPartData?.[0].data)

  return response
})
