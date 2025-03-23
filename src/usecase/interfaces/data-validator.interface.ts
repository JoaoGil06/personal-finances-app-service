export default interface DataValidatorInterface {
  validateEmail(value: string): Boolean;
  validatePassword(value: string): Boolean;
}
