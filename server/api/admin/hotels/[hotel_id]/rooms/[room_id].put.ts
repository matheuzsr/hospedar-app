import { getRouterParam } from 'h3'
import { defineSafeEventHandler } from '~/server'
import { RoomController } from '~/server/controller/RoomController'

export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))
  const roomId = Number(getRouterParam(event, 'room_id'))
  const body = await readBody(event)

  const controller = new RoomController()
  const response = await controller.edit(hotelId, roomId, body)

  return response
})
