import { DataValidator } from "../../../infrastructure/adapters/data-validator.adapter";
import Entity from "../../@shared/entity/entity.abstract";

export default class TransactionPersona extends Entity {
  private _name: string;
  private _image_url: string;

  constructor(id: string, name: string, image_url: string) {
    super();
    this._id = id;
    this._image_url = image_url;
    this._name = name;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get image_url(): string {
    return this._image_url;
  }

  validate() {
    const validator = new DataValidator();
    if (this._id.length === 0) {
      throw new Error("Transaction Persona ID is required");
    }

    if (this._name.length === 0) {
      throw new Error("Transaction Persona Name is required");
    }

    if (validator.validateImageUrl(this.image_url)) {
      throw new Error("Transaction Persona Image URL is required");
    }
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  changeImageUrl(image_url: string) {
    this._image_url = image_url;

    this.validate();
  }
}
