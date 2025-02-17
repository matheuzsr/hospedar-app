import { supabase } from "~/infra/SupabaseAdapter"
import { InternalServerError, NotFoundError } from "~/server/errors"

export class RoomService {
  async getList(hotelId: number) {
    const { data, error } = await supabase.from('room').select('*').eq('hotel_id', hotelId)
    if (error) throw new InternalServerError('Error getting rooms')
    if (!data) throw new NotFoundError('Rooms not found')

    return data
  }

  async get(hotelId: number, roomId: number) {
    const { data, error } = await supabase.from('room').select('*').eq('hotel_id', hotelId).eq('id', roomId).single()
    if (error) throw new InternalServerError('Error getting room')
    if (!data) throw new NotFoundError('Room not found')

    return data
  }

  public async edit(hotelId: number, roomId: number, roomData: any) {
    const { error, data } = await supabase.from('room').update(roomData).eq('hotel_id', hotelId).eq('id', roomId).select().single()
    if (error || !data) throw new InternalServerError('Error updating room')

    return data
  }

  public async create(hotelId: number, roomData: any) {
    const { error, data } = await supabase.from('room').insert({ ...roomData, hotel_id: hotelId }).select().single()
    if (error || !data) throw new InternalServerError('Error creating room')

    return data
  }
}
