import PasswordHasherInterface from "../../usecase/interfaces/password-hasher.interface";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements PasswordHasherInterface {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
