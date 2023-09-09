export interface Validator {
  getErrorMessage(): string;
  validate(): boolean;
}
