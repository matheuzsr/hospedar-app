import { defineSafeEventHandler } from "~/server";
import { HotelController } from "~/server/controller/HotelController";


export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id')) || undefined;

  const controller = new HotelController();
  const response = await controller.get(hotelId);

  return response
})
