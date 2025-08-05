import { v4 as uuid } from "uuid";
import TransactionPersona from "../transactionPersona";

export default class TransactionPersonaFactory {
  public static create(
    name: string,
    image_url: string,
    id = uuid()
  ): TransactionPersona {
    return new TransactionPersona(id, name, image_url);
  }
}
