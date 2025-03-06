import { customFetch } from "."
import { AbstractService } from "./AbstractService"

export class HotelImageService extends AbstractService {
  public async delete(hotelId: number, path: string) {
    try {
      const response = await customFetch(`/api/admin/hotels/${hotelId}/images`, {
        method: "DELETE",
        body: { path },
      })

      return { data: response.data, error: false }
    } catch (error: any) {
      return { data: error, error: true }
    }
  }

  public async getList(hotelId: number) {
    try {
      const response = await customFetch(`/api/admin/hotels/${hotelId}/images`, {
        method: "GET",
      })

      return { data: this.formatSnakeToCamelList(response), error: false }
    } catch (error: any) {
      return { data: error, error: true }
    }
  }

  public async updateOrder(hotelId: number, images: { id: number; order: number }[]) {
    try {
      const response = await customFetch(`/api/admin/hotels/${hotelId}/images/order`, {
        method: "PUT",
        body: { images },
      })

      return { data: response.data, error: false }
    } catch (error: any) {
      return { data: error, error: true }
    }
  }

  public async upload(hotelId: number, name: string, file: File) {
    const response = await customFetch(`/api/admin/hotels/${hotelId}/images`, {
      method: "POST",
      body: this.buildBodyForm(file, name),
    })

    if (response.error) return { data: response.error, error: true }

    return { data: response.data, error: false }
  }

  private buildBodyForm(file: File, name: string) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("name", name)

    return formData
  }
}
