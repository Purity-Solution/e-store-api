import { Default, Format, Property, Required } from "@tsed/schema";
import { Model, ObjectID, Unique } from "@tsed/mongoose";

enum Categories {
  CAT1 = "cat1",
  CAT2 = "cat2",
}

@Model()
export class MyModel {
  @ObjectID("id")
  _id: string;

  @Required()
  firstName: string;

  @Property()
  lastName: string;

  @Unique()
  @Required()
  @Format("email")
  email: string;

  @Required()
  password: string;

  @Property()
  @Default("Pakistan")
  country: string;

  @Required()
  city: string;

  @Required()
  address: string;

  @Format("date-time")
  @Default(Date.now)
  createdDate: Date = new Date();

  @Format("date-time")
  @Default(Date.now)
  updatedDate: Date = new Date();
}
