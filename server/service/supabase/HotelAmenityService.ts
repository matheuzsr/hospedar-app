import { supabase } from "~/infra/SupabaseAdapter"
import { InternalServerError } from "~/server/errors/errors"
import type { AmenityDto } from "./AmenityService"

export interface HotelAmenityDto extends AmenityDto {
  hotelId: number
  amenityId?: number
  optional?: boolean
}

export class HotelAmenityService {

  async createOrEdit(hotelAmenity: HotelAmenityDto) {
    const { amenityId, hotelId, optional } = hotelAmenity

    const { error, data } = await supabase
      .from('hotel_amenity')
      .upsert({ amenity_id: amenityId, hotel_id: hotelId, optional, deleted_at: null })

    if (error) throw new InternalServerError('Error creating hotel amenity')

    return data

  }

  async get(hotelId: number) {
    const { data, error } = await supabase
      .from('hotel_amenity')
      .select('amenity_id, optional, amenity(name)')
      .eq('hotel_id', hotelId)
      .is('deleted_at', null)
    if (error) throw new InternalServerError('Error getting hotel amenities')

    return data
  }
}
