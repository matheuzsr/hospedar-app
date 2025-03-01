import { supabase } from "~/infra/SupabaseAdapter"
import { InternalServerError } from "~/server/errors/errors"
import type { AmenityDto } from "./AmenityService"
import { AmenityService } from "./AmenityService"

export interface HotelAmenityDto extends AmenityDto {
  hotelId: number
  amenityId?: number
  optional?: boolean
}

export class HotelAmenityService {

  async create(hotelAmenity: HotelAmenityDto) {
    const amenityService = new AmenityService()

    const amenityData = await amenityService.createOrEdit(hotelAmenity.name)
    const hotelAmenityCreated = { amenity_id: amenityData.id, hotel_id: hotelAmenity.hotelId }

    const { error, data } = await supabase
      .from('hotel_amenity')
      .insert(hotelAmenityCreated)
      .select('*, amenity(name)')
      .single()
    if (error || !data) throw new InternalServerError('Error creating hotel')

    return data
  }

  async get(hotelId: number) {
    const { data, error } = await supabase
      .from('hotel_amenity')
      .select('amenity_id, amenity(name)')
      .eq('hotel_id', hotelId)
      .is('deleted_at', null)
    if (error) throw new InternalServerError('Error getting hotel amenities')

    return data
  }
}
