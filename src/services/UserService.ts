import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { UserModel } from "../models/UserModel";
import { CreateUserTypes } from "../../types";

Injectable();
export class UserService {
  @Inject(UserModel)
  private userModel: MongooseModel<UserModel>;

  public async createUser(data: CreateUserTypes) {
    await this.userModel.create({ ...data });
  }

  public async findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
}
