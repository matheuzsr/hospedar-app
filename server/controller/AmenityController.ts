import { AmenityService } from "../service/supabase/AmenityService"

export class AmenityController {
  private service = new AmenityService()
  public async createOrEdit(name: string) {
    return this.service.createOrEdit(name)
  }

  public async getList() {
    return this.service.getList()
  }
}
