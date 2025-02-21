import { customFetch } from "."

export class HotelService {
  async getList() {
    return customFetch("/api/admin/hotels")
  }

  async delete(hotelId: number) {
    return customFetch(`/api/admin/hotels/${hotelId}`, { method: 'DELETE' })
  }
}
