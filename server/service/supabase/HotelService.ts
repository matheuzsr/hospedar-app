import { supabase } from "~/infra/SupabaseAdapter"
import { InternalServerError, NotFoundError } from "~/server/errors/errors"

export class HotelService {
  async get(hotelId: number) {
    const { data, error } = await supabase.from('hotel').select('*').eq('id', hotelId).eq('deleted_at', null).single()
    if (error) throw new InternalServerError('Error getting hotel')
    if (!data) throw new NotFoundError('Hotel not found')

    return data
  }

  async getList() {
    const { data, error } = await supabase.from('hotel').select('*').eq('deleted_at', null)
    if (error) throw new InternalServerError('Error getting hotels')

    return data
  }

  async edit(hotelId: number, hotelData: any) {
    const { data, error } = await supabase.from('hotel').update(hotelData).eq('id', hotelId).select().single()
    if (error || !data) throw new InternalServerError('Error updating hotel')

    return data
  }

  async delete(hotelId: number) {
    const { data, error } = await supabase.from('hotel').update({ deleted_at: new Date() }).eq('id', hotelId).select().single()
    if (error || !data) throw new InternalServerError('Error deleting hotel')

    return data
  }

  async create(hotelData: any) {
    const { error, data } = await supabase.from('hotel').insert(hotelData).select().single()
    if (error || !data) throw new InternalServerError('Error creating hotel')

    return data
  }
}
