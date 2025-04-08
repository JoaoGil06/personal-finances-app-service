export default interface PasswordHasherInterface {
  hash(password: string): Promise<string>;
  compare(passwordAsText: string, encryptedPassword: string): Promise<boolean>;
}
