import User from "../entity/user/user";
import RepositoryInterface from "./repository-interface";

export default interface UserRepositoryInterface
  extends RepositoryInterface<User> {
  findByEmail(email: string): Promise<User | null>;
}
