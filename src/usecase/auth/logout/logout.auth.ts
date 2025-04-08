export default class LogoutAuthUseCase {
  async execute(): Promise<{ message: string }> {
    return { message: "Logout successful" };
  }
}
