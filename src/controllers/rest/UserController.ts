import { Controller, Inject } from "@tsed/di";
import { BodyParams, Context } from "@tsed/platform-params";
import { Get, Post, Property, Required, Returns } from "@tsed/schema";
import { SuccessResult } from "../../utils/entities";
import { UserService } from "../../services/UserService";
import { LoginRetrunModel, SuccessReturnModel, UserReturnModel } from "src/RestModel";
import jwt from "jsonwebtoken";
import { BadRequest, NotFound } from "@tsed/exceptions";
import { UserModel } from "src/models/UserModel";
import { verifyToken } from "../../utils/helper";

class UserParams {
  @Required() public readonly firstName: string;
  @Property() public readonly lastName: string;
  @Required() public readonly email: string;
  @Required() public readonly password: string;
  @Required() public readonly phoneNumber: string;
  @Property() public readonly country: string;
  @Required() public readonly city: string;
  @Required() public readonly address: string;
}

class LoginParams {
  @Required() public readonly email: string;
  @Required() public readonly password: string;
}

const privateKey = process.env.PRIVATE_KEY || "LKXTwt0oxAQZXDE";
@Controller("/user")
export class UserController {
  @Inject()
  private userService: UserService;

  @Post("/register")
  @Returns(200, SuccessResult).Of(UserParams)
  public async registerUser(@BodyParams() body: UserParams, @Context() context: Context) {
    console.log(context.get("user"));
    await this.userService.createUser(body);
    return new SuccessResult({ message: "User created successfully" }, SuccessReturnModel);
  }

  @Post("/login")
  @Returns(200, SuccessResult).Of(LoginRetrunModel)
  public async login(@BodyParams() body: LoginParams) {
    const { email, password } = body;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new NotFound("USER NOT FOUND");
    if (user.password !== password) throw new BadRequest("Invalid password");
    const token = jwt.sign({ email: user.email }, privateKey, { expiresIn: "7d" });
    return new SuccessResult(
      { firstName: user.firstName, email: user.email, token },
      LoginRetrunModel
    );
  }

  @Get("/all")
  @Returns(200, SuccessResult).Of(UserModel)
  public async getUsers(@Context() context: Context) {
    console.log(context.get("user"));
    const data = verifyToken("");
    console.log("data token=------------/", data);

    const users = await this.userService.findUsers();
  }
}
