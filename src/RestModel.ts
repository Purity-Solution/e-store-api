import { Property, Required } from "@tsed/schema";

export class UserReturnModel {
  @Required() public readonly firstName: string;
  @Property() public readonly lastName: string;
  @Required() public readonly email: string;
  @Required() public readonly password: string;
  @Required() public readonly phoneNumber: string;
  @Required() public readonly country: string;
  @Required() public readonly city: string;
  @Required() public readonly address: string;
  @Required() public readonly createdDate: Date;
}

export class SuccessReturnModel {
  @Property() public readonly message: string;
}
