import { replaceObjectKeys, snakeToCamel } from "~/server/helper/properties.helper"

export class AbstractService {
  public formatSnakeToCamelList(list: any) {
    return list.map((item: any) => replaceObjectKeys(item, snakeToCamel))
  }
}
