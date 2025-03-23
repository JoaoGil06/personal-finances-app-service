import { DataValidator } from "../../../infrastructure/adapters/data-validator.adapter";
import Entity from "../../@shared/entity/entity.abstract";

export default class User extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _accounts: string[] = [];

  constructor(id: string, name: string, email: string, password: string) {
    super();

    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get accountIds(): string[] {
    return this._accounts;
  }

  validate() {
    const dataValidator = new DataValidator();

    if (this._id.length === 0) {
      throw new Error("ID is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    // if (dataValidator.validateEmail(this._email)) {
    //   throw new Error("Email is not valid");
    // }

    // if (dataValidator.validatePassword(this._password)) {
    //   throw new Error("Password is not strong");
    // }
  }

  addAccount(accountId: string) {
    if (!this._accounts.includes(accountId)) {
      this._accounts.push(accountId);
    }
  }
}
