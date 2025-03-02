import { camelToSnake, replaceObjectKeys, snakeToCamel } from "~/server/helper/properties.helper"
import { customFetch } from "."

export class HotelService {
  async getList() {
    try {
      const response = await customFetch("/api/admin/hotels")

      return this.formatSnakeToCamelList(response)
    }
    catch (error: any) {
      console.error(`[Erro] ${error.message}`)
      console.error(`[Stack] ${error.stack}`)
    }

  }

  private formatSnakeToCamelList(list: any) {
    return list.map((item: any) => replaceObjectKeys(item, snakeToCamel))
  }

  async delete(hotelId: number) {
    return customFetch(`/api/admin/hotels/${hotelId}`, { method: 'DELETE' })
  }

  async edit(hotelId: number, data: any) {
    const formattedData = replaceObjectKeys(data, camelToSnake)

    return customFetch(`/api/admin/hotels/${hotelId}`, { method: 'PUT', body: JSON.stringify((formattedData)) })
  }

  async create(data: any) {
    const formattedData = replaceObjectKeys(data, camelToSnake)

    return customFetch(`/api/admin/hotels`, { method: 'POST', body: JSON.stringify((formattedData)) })
  }
}
