import { camelToSnake, replaceObjectKeys, snakeToCamel } from "~/server/helper/properties.helper"
import { customFetch } from "."
import { AbstractService } from "./AbstractService"

export class HotelService extends AbstractService {
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
  async get(id: number) {
    try {
      const response = await customFetch(`/api/admin/hotels/${id}`)

      return replaceObjectKeys(response, snakeToCamel)
    }
    catch (error: any) {
      console.error(`[Erro] ${error.message}`)
      console.error(`[Stack] ${error.stack}`)
    }

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
