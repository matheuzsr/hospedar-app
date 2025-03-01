import { supabase } from "~/infra/SupabaseAdapter"
import { InternalServerError } from "~/server/errors/errors"

export interface AmenityDto {
  id?: number
  name: string
}

export class AmenityService {
  async createOrEdit(name: string): Promise<AmenityDto> {
    const { error } = await supabase
      .from('amenity')
      .upsert({ name }, { onConflict: 'name' })
    if (error) throw new InternalServerError(`Error creating amenity ${name}`)

    const { data } = await supabase.from('amenity').select().eq('name', name).single()

    return data
  }

  async getList(): Promise<AmenityDto[]> {
    const { data, error } = await supabase.from('amenity').select().is('deleted_at', null)
    if (error) throw new InternalServerError('Error getting amenities')

    return data
  }
}
