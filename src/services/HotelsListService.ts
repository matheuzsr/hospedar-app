export class HotelListService {
  public async get() {
    return useFetch('/api/hotels/list', {body: 'oi'})
  }
}
