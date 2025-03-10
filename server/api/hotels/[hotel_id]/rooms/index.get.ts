import { getRouterParam } from 'h3'
import { defineSafeEventHandler } from '~/server'
import { RoomController } from '~/server/controller/RoomController'

export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))

  const controller = new RoomController()
  const response = await controller.getList(hotelId)

  return response
})
