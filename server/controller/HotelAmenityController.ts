import type { HotelAmenityDto } from "../service/supabase/HotelAmenityService"
import { HotelAmenityService } from "../service/supabase/HotelAmenityService"

export class HotelAmenityController {
  private service = new HotelAmenityService()
  public async create(amenityDto: HotelAmenityDto) {
    return this.service.create(amenityDto)
  }

  public async get(hotelId: number) {
    return this.service.get(hotelId)
  }
}
