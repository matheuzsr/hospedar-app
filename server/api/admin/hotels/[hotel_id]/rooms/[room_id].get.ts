import { getRouterParam } from 'h3'
import { defineSafeEventHandler } from '~/server'

export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'))
  const roomId = Number(getRouterParam(event, 'room_id'))

  sendRedirect(event, `/api/hotels/${hotelId}/rooms/${roomId}`, 307)
})
