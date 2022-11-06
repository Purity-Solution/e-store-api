import { Generics, Property, Required } from "@tsed/schema";
import { OnSerialize, serialize } from "@tsed/json-mapper";

const serializationMap = new WeakMap<any, any>();

@Generics("T")
export class SuccessResult<T> {
  @Required() @Property() public success: boolean;
  @OnSerialize((v) => serialize(v, { type: serializationMap.get(v) }))
  @Property("T")
  public data: T;

  public constructor(data: T, clazz: { new (...args: any[]): T }) {
    this.success = true;
    this.data = data;
    serializationMap.set(data, clazz);
  }
}
