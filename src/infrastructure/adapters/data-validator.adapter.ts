import Validator from "validator";
import DataValidatorInterface from "../../usecase/interfaces/data-validator.interface";

export class DataValidator implements DataValidatorInterface {
  validateEmail(value: string): Boolean {
    return Validator.isEmail(value);
  }
  validatePassword(value: string): Boolean {
    return Validator.isStrongPassword(value);
  }
}
