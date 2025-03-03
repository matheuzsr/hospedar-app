import { supabase } from "~/infra/SupabaseAdapter"
import { InternalServerError, NotFoundError } from "~/server/errors/errors"

export class RoomService {
  async getList(hotelId: number) {
    const { data, error } = await supabase.from('room').select('*').eq('hotel_id', hotelId).is('deleted_at', null)
    if (error) throw new InternalServerError('Error getting rooms')
    if (!data) throw new NotFoundError('Rooms not found')

    return data
  }

  async get(hotelId: number, roomId: number) {
    const { data, error } = await supabase.from('room').select('*').eq('hotel_id', hotelId).eq('id', roomId).is('deleted_at', null).single()
    if (error) throw new InternalServerError('Error getting room')
    if (!data) throw new NotFoundError('Room not found')

    return data
  }

  public async edit(hotelId: number, roomId: number, roomData: any) {
    const roomDataToSave = {
      bed_type: roomData.bed_type,
      has_air_conditioning: roomData.has_air_conditioning,
      has_tv: roomData.has_tv,
      tv_type: roomData.tv_type,
      has_minibar: roomData.has_minibar,
      bathroom_type: roomData.bathroom_type,
      view_type: roomData.view_type,
      smoking_allowed: roomData.smoking_allowed,
      max_guests: roomData.max_guests,
      size: roomData.size,
      price_per_night: roomData.price_per_night,
      additional_features: roomData.additional_features,
      updated_at: new Date(),
      floor: roomData.floor,
      name: roomData.name,
      description: roomData.description,
      available_quantity: roomData.available_quantity,
      // status: roomData.status,
    }
    const { error, data } = await supabase.from('room').update(roomDataToSave).eq('hotel_id', hotelId).eq('id', roomId).select().single()
    if (error || !data) throw new InternalServerError('Error updating room')

    return data
  }

  public async create(hotelId: number, roomData: any) {
    const roomDataToSave = {
      bed_type: roomData.bed_type,
      has_air_conditioning: roomData.has_air_conditioning,
      has_tv: roomData.has_tv,
      tv_type: roomData.tv_type,
      has_minibar: roomData.has_minibar,
      bathroom_type: roomData.bathroom_type,
      view_type: roomData.view_type,
      smoking_allowed: roomData.smoking_allowed,
      max_guests: roomData.max_guests,
      size: roomData.size,
      price_per_night: roomData.price_per_night,
      additional_features: roomData.additional_features,
      updated_at: new Date(),
      floor: roomData.floor,
      name: roomData.name,
      description: roomData.description,
      available_quantity: roomData.available_quantity,
      // status: roomData.status,
    }
    const { error, data } = await supabase.from('room').insert({ ...roomDataToSave, hotel_id: hotelId }).select().single()
    if (error || !data) throw new InternalServerError('Error creating room')

    return data
  }

  public async delete(hotelId: number, roomId: number) {
    const { data, error } = await supabase.from('room').update({ deleted_at: new Date() }).eq('id', roomId).eq('hotel_id', hotelId).select().single()
    if (error || !data) throw new InternalServerError('Error deleting room')

    return data
  }
}
