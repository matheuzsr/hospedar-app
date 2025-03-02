import type { HotelAmenityDto } from "../service/supabase/HotelAmenityService"
import { HotelAmenityService } from "../service/supabase/HotelAmenityService"

export class HotelAmenityController {
  private service = new HotelAmenityService()
  public async createOrEdit(amenityDto: HotelAmenityDto) {
    return this.service.createOrEdit(amenityDto)
  }

  public async get(hotelId: number) {
    return this.service.get(hotelId)
  }
}
