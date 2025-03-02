import { supabase } from "~/infra/SupabaseAdapter"
import { InternalServerError, NotFoundError } from "~/server/errors/errors"
import { HotelAmenityService } from "./HotelAmenityService"

export class HotelService {
  private hotelAmenityService: HotelAmenityService
  constructor() {
    this.hotelAmenityService = new HotelAmenityService()
  }

  async get(hotelId: number) {
    const { data, error } = await supabase.from('hotel').select('*').eq('id', hotelId).is('deleted_at', null).single()

    if (error) throw new InternalServerError('Error getting hotel')
    if (!data) throw new NotFoundError('Hotel not found')

    return data
  }

  async getList() {
    const { data, error } = await supabase.from('hotel').select('*').is('deleted_at', null)
    if (error) throw new InternalServerError('Error getting hotels')
    if (!data) return []
    const hotelWithAmenities = []

    for (const hotel of data) {
      const hotelId = hotel.id
      const amenities = await this.hotelAmenityService.get(hotelId)
      hotelWithAmenities.push({ ...hotel, amenities })
    }

    return hotelWithAmenities

  }

  async edit(hotelId: number, hotelData: any) {
    const hotelToEdit = {
      id: hotelData.id,
      name: hotelData.name,
      description: hotelData.description,
      updated_at: hotelData.updated_at,
      street_name: hotelData.street_name,
      address_neighborhood: hotelData.address_neighborhood,
      zip_code: hotelData.zip_code,
      address_number: hotelData.address_number,
      latitude: hotelData.latitude,
      longitude: hotelData.longitude,
      checkin_time: hotelData.checkin_time,
      checkout_time: hotelData.checkout_time
    }

    const { data, error } = await supabase.from('hotel').update(hotelToEdit).eq('id', hotelId).select().single()
    if (error || !data) throw new InternalServerError('Error updating hotel')

    for (const amenity of hotelData.included_amenities) {
      if (!amenity) continue
      await this.hotelAmenityService.createOrEdit({ hotelId, amenityId: amenity, optional: false })

    }
    for (const amenity of hotelData.optional_amenities) {
      if (!amenity) continue
      await this.hotelAmenityService.createOrEdit({ hotelId, amenityId: amenity, optional: true })
    }

    return data
  }

  async delete(hotelId: number) {
    const { data, error } = await supabase.from('hotel').update({ deleted_at: new Date() }).eq('id', hotelId).select().single()
    if (error || !data) throw new InternalServerError('Error deleting hotel')

    return data
  }

  async create(hotelData: any) {
    const hotelToCreate = {
      name: hotelData.name,
      description: hotelData.description,
      street_name: hotelData.street_name,
      address_neighborhood: hotelData.address_neighborhood,
      zip_code: hotelData.zip_code,
      address_number: hotelData.address_number,
      latitude: hotelData.latitude,
      longitude: hotelData.longitude,
      checkin_time: hotelData.checkin_time,
      checkout_time: hotelData.checkout_time
    }

    const { data, error } = await supabase.from('hotel').insert(hotelToCreate).select().single()
    if (error || !data) throw new InternalServerError('Error creating hotel')

    const hotelId = data.id

    if (hotelData.included_amenities) {
      for (const amenity of hotelData.included_amenities) {
        if (!amenity) continue
        await this.hotelAmenityService.createOrEdit({ hotelId, amenityId: amenity, optional: false })
      }
    }

    if (hotelData.optional_amenities) {
      for (const amenity of hotelData.optional_amenities) {
        if (!amenity) continue
        await this.hotelAmenityService.createOrEdit({ hotelId, amenityId: amenity, optional: true })
      }
    }

    return data
  }
}
