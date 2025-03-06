import { ValidationError } from "../errors/errors"
import { HotelImageService } from "../service/supabase/HotelImageService"

export class HotelImageController {
  private service = new HotelImageService()

  public async getList(hotelId: number) {
    if (!hotelId) throw new ValidationError('Hotel ID is required')

    return this.service.getList(hotelId)
  }

  public async delete(hotelId: number, imagePath: string) {
    if (!imagePath) throw new ValidationError('Image path is required')

    return this.service.delete(hotelId, imagePath)
  }

  public async upload(hotelId: number, fileName: string, file: File | Buffer<ArrayBufferLike>) {
    if (!file) throw new ValidationError('File is required')

    return this.service.upload(hotelId, fileName, file)
  }
}
