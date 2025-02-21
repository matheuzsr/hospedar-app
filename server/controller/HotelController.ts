import { HotelService } from "~/server/service/supabase/HotelService"
import { BadRequestError, ValidationError } from "../errors/errors"

export class HotelController {
  private hotelService = new HotelService()
  public async get(hotelId?: number) {
    if (!hotelId) throw new ValidationError('Hotel ID is required')

    return this.hotelService.get(hotelId)
  }

  public async getList() {
    return this.hotelService.getList()
  }
  public async edit(hotelId: number, hotelData: any) {
    if (!hotelId) throw new ValidationError('Hotel ID is required')
    if (!hotelData || Object.keys(hotelData).length === 0)
      throw new BadRequestError('Data to update is required')

    return this.hotelService.edit(hotelId, hotelData)
  }

  public async create(hotelData: any) {
    if (!hotelData || Object.keys(hotelData).length === 0)
      throw new BadRequestError('Data to update is required')

    return this.hotelService.create(hotelData)
  }

  public async delete(hotelId: number) {
    if (!hotelId) throw new ValidationError('Hotel ID is required')

    return this.hotelService.delete(hotelId)
  }
}
