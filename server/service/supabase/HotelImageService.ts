import { supabase } from "~/infra/SupabaseAdapter"
import { InternalServerError } from "~/server/errors/errors"

export class HotelImageService {
  public async delete(hotelId: number, imagePath: string) {
    const { data, error } = await supabase
      .from('hotel_image')
      .update({ deleted_at: new Date() })
      .eq('hotel_id', hotelId)
      .eq('path', imagePath)
      .select().single()
    if (error || !data) throw new InternalServerError(`Error deleting image hotel ${hotelId} path ${imagePath}`)

    return data

  }

  public async upload(hotelId: number, fileName: string, file: File | Buffer<ArrayBufferLike>) {
    const path = `${hotelId}/${fileName}`

    const { error } = await supabase.storage
      .from("hotel-image")
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/*',
      })

    if (error) return new InternalServerError(error.message)

    const response = await supabase.storage
      .from("hotel-image")
      .getPublicUrl(path)

    if (!response.data.publicUrl) return new InternalServerError("Error to get public url")

    const { error: errorSaveDataBase, data: dataSavedDataBase } = await supabase.from('hotel_image').insert({ hotel_id: hotelId, image_name: fileName, public_url: response.data.publicUrl, path: path }).select().single()
    if (errorSaveDataBase) return new InternalServerError(errorSaveDataBase.message)

    return dataSavedDataBase
  }

  public async getList(hotelId: number) {
    const { data, error } = await supabase.from("hotel_image").select().eq('hotel_id', hotelId).is('deleted_at', null).order('order', { nullsFirst: false })
    if (error) return new InternalServerError(`Error getting images from hotel ${hotelId}`)

    return data
  }

  public async updateOrder(hotelId: number, images: { id: number, order: number }[]) {
    const { data, error } = await supabase.from('hotel_image').upsert(images)
    if (error) return new InternalServerError(`Error updating order from hotel ${hotelId}`)

    return data
  }
}
