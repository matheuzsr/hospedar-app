import { defineSafeEventHandler } from "~/server"

export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id')) || undefined
  sendRedirect(event, `/api/hotels/${hotelId}`, 307)
})
