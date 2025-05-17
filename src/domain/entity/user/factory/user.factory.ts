import { v4 as uuid } from "uuid";
import User from "../user";

export default class UserFactory {
  public static create(
    name: string,
    email: string,
    password: string,
    id = uuid()
  ) {
    return new User(id, name, email, password);
  }
}
