import { defineSafeEventHandler } from "~/server";
import { HotelController } from "~/server/controller/HotelController";


export default defineSafeEventHandler(async (event) => {
  const controller = new HotelController();
  const response = await controller.getList();

  return response
})
