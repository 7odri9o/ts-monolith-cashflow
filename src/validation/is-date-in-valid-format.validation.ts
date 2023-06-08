import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsDateInValidFormatValidation
  implements ValidatorConstraintInterface
{
  readonly regex: RegExp = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

  validate(date: string) {
    return this.regex.test(date);
  }

  defaultMessage(): string {
    return 'date should be in yyyy-mm-dd format';
  }
}
