import { defineSafeEventHandler } from "~/server";
import { HotelController } from "~/server/controller/HotelController";


export default defineSafeEventHandler(async (event) => {
  const hotelId = Number(getRouterParam(event, 'hotel_id'));
  const body = await readBody(event);

  const controller = new HotelController();
  await controller.edit(hotelId, body);

  return { success: true, message: "Hotel updated successfully" };
})
