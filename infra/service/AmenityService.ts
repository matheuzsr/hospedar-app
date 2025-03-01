import { customFetch } from "."

export class AmenityService {
  async getList() {
    return customFetch("/api/admin/amenities")
  }

  async create(name: string) {
    return customFetch(`/api/admin/amenities`, { method: 'PUT', body: JSON.stringify({ name }) })
  }
}
