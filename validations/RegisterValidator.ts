import { RegisterForm } from '@/types';
import { Validator } from './Validator';
import { ValidationError } from '@/lib/error';

class RegisterValidator implements Validator {
  private errorMessage: string = '';
  constructor(public attrs: RegisterForm) {}

  getErrorMessage(): string {
    return this.errorMessage;
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.attrs.email)) {
      throw new ValidationError('The email is invalid');
    }
  }

  validatePassword() {
    const minimumLength = 8;
    const { password } = this.attrs;

    if (password.length < minimumLength) {
      throw new ValidationError(
        `The password must be at least ${minimumLength} characters long`
      );
    }

    if (password.search(/[a-z]/i) < 0) {
      throw new ValidationError(
        'The password must contain at least one letter'
      );
    }

    if (password.search(/[0-9]/) < 0) {
      throw new ValidationError(
        'The password must contain at least one number'
      );
    }

    if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) < 0) {
      throw new ValidationError(
        'The password must contain at least one special character'
      );
    }
  }

  validateConfirmPassword() {
    const { password, confirmPassword } = this.attrs;

    if (password !== confirmPassword) {
      throw new ValidationError('The passwords do not match');
    }
  }

  validateNames() {
    const { givenName, familyName } = this.attrs;
    if (!givenName || !familyName) {
      throw new ValidationError('Missing names');
    }
  }

  validate() {
    try {
      this.validateEmail();
      this.validateNames();
      this.validatePassword();
      this.validateConfirmPassword();
      return true;
    } catch (error) {
      this.errorMessage = (error as ValidationError).message;
      return false;
    }
  }
}

export default RegisterValidator;
