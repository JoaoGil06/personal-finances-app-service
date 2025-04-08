import PasswordHasherInterface from "../../usecase/interfaces/password-hasher.interface";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements PasswordHasherInterface {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(
    passwordAsText: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(passwordAsText, encryptedPassword);
  }
}
