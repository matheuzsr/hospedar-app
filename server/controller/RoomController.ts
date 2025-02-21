import { RoomService } from "~/server/service/supabase/RoomsService"
import { BadRequestError, ValidationError } from "../errors/errors"

export class RoomController {
  private roomService = new RoomService()
  public async getList(hotelId?: number) {
    if (!hotelId) throw new ValidationError('Hotel ID is required')

    return this.roomService.getList(hotelId)
  }
  public async get(hotelId: number, roomId: number) {
    if (!hotelId || !roomId) throw new ValidationError('Hotel ID and Room ID is required')

    return this.roomService.get(hotelId, roomId)
  }
  public async edit(hotelId: number, roomId: number, roomData: any) {
    if (!hotelId || !roomId) throw new ValidationError('Hotel ID and Room ID is required')
    if (!roomData || Object.keys(roomData).length === 0)
      throw new BadRequestError('Data to update is required')

    return this.roomService.edit(hotelId, roomId, roomData)
  }

  public async create(hotelId: number, roomData: any) {
    if (!hotelId) throw new ValidationError('Hotel ID and Room ID is required')
    if (!roomData || Object.keys(roomData).length === 0)
      throw new BadRequestError('Data to update is required')

    return this.roomService.create(hotelId, roomData)
  }

  public async delete(hotelId: number, roomId: number) {
    if (!hotelId || !roomId) throw new ValidationError('Hotel ID and Room ID is required')

    return this.roomService.delete(hotelId, roomId)
  }
}
