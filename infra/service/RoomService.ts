import { camelToSnake, replaceObjectKeys, snakeToCamel } from "~/server/helper/properties.helper"
import { customFetch } from "."

export class RoomService {
  async getList(hotelId: number) {
    try {
      const response = await customFetch(`/api/admin/hotels/${hotelId}/rooms`)

      return { data: this.formatSnakeToCamelList(response), error: false }
    }
    catch (error: any) {
      console.error(`[Erro] ${error.message}`)
      console.error(`[Stack] ${error.stack}`)

      return { data: error.message, error: true }
    }
  }

  async delete(hotelId: number, roomId: number) {
    try {
      const response = await customFetch(`/api/admin/hotels/${hotelId}/rooms/${roomId}`, { method: 'DELETE' })

      return { data: response, error: false }
    }
    catch (error: any) {
      console.error(`[Erro] ${error.message}`)
      console.error(`[Stack] ${error.stack}`)

      return { data: error.message, error: true }
    }
  }

  async edit(hotelId: number, roomId: number, data: any) {
    const formattedData = replaceObjectKeys(data, camelToSnake)

    return customFetch(`/api/admin/hotels/${hotelId}/rooms/${roomId}`, { method: 'PUT', body: JSON.stringify((formattedData)) })
  }

  async create(hotelId: number, data: any) {
    const formattedData = replaceObjectKeys(data, camelToSnake)

    return customFetch(`/api/admin/hotels/${hotelId}/rooms`, { method: 'POST', body: JSON.stringify((formattedData)) })
  }

  private formatSnakeToCamelList(list: any) {
    return list.map((item: any) => replaceObjectKeys(item, snakeToCamel))
  }

}
