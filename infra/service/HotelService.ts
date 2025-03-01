import { customFetch } from "."

export class HotelService {
  async getList() {
    return customFetch("/api/admin/hotels")
  }

  async delete(hotelId: number) {
    return customFetch(`/api/admin/hotels/${hotelId}`, { method: 'DELETE' })
  }

  async edit(hotelId: number, data: any) {
    return customFetch(`/api/admin/hotels/${hotelId}`, { method: 'PUT', body: JSON.stringify(data) })
  }
}
