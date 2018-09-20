import { PastConstraintValidator } from './PastConstraintValidator';
import { ConstraintValidator } from './ConstraintValidator';
import { ConstraintValidationContext, DateProvider, Validator, ValidatorOptions } from '../validation';
import { ConstraintDescriptor } from '@es-validation/decorators';
import { createMockInstance } from 'jest-create-mock-instance';

 // NOTE: required due to jest-date-mock
 declare var global: any;
 global.Date = Object.getPrototypeOf(new Date()).constructor;

describe('Past constraint validator', () => {
    let pastConstraintValidator: ConstraintValidator<any>;
    let constraintValidationContext: jest.Mocked<ConstraintValidationContext>;
    let constraintDescriptor: jest.Mocked<ConstraintDescriptor>;
    let validatorOptions: ValidatorOptions;
    let dateProvider: jest.Mocked<DateProvider>;
    let validator: jest.Mocked<Validator>;

    beforeEach(() => {
        validatorOptions = new ValidatorOptions();
        dateProvider = createMockInstance(DateProvider);
        dateProvider.getDate.mockReturnValueOnce(new Date('2018-09-20T08:28:01Z'));
        validator = createMockInstance(Validator);
        validator.getDateProvider.mockReturnValue(dateProvider);
        validator.getValidatorOptions.mockReturnValue(validatorOptions);
        constraintValidationContext = createMockInstance(ConstraintValidationContext as any);
        constraintValidationContext.getValidator = jest.fn<() => Validator>();
        constraintValidationContext.getValidator.mockReturnValueOnce(validator);
        constraintDescriptor = {} as jest.Mocked<ConstraintDescriptor>;
        constraintDescriptor.getAttribute = jest.fn<(attributeName: string) => any>();
        pastConstraintValidator = new PastConstraintValidator();
    });

    it('considers a date in the past to be valid', () => {
        // given
        let value: Date = new Date('2018-09-20T08:28:00Z');
        constraintDescriptor.getAttribute.mockImplementationOnce(attributeName => {
            if (attributeName === 'present') { return false; }
            return undefined;
        });
        pastConstraintValidator.initialize(constraintDescriptor);
        // when
        let result: boolean = pastConstraintValidator.isValid(value, constraintValidationContext);
        // then
        expect(result).toBe(true);
    });

    it('considers a date in the present to be invalid when present is false', () => {
        // given
        let value: Date = new Date('2018-09-20T08:28:01Z');
        constraintDescriptor.getAttribute.mockImplementationOnce(attributeName => {
            if (attributeName === 'present') { return false; }
            return undefined;
        });
        pastConstraintValidator.initialize(constraintDescriptor);
        // when
        let result: boolean = pastConstraintValidator.isValid(value, constraintValidationContext);
        // then
        expect(result).toBe(false);
    });

    it('considers a date in the present to be valid when present is true', () => {
        // given
        let value: Date = new Date('2018-09-20T08:28:01Z');
        constraintDescriptor.getAttribute.mockImplementationOnce(attributeName => {
            if (attributeName === 'present') { return true; }
            return undefined;
        });
        pastConstraintValidator.initialize(constraintDescriptor);
        // when
        let result: boolean = pastConstraintValidator.isValid(value, constraintValidationContext);
        // then
        expect(result).toBe(true);
    });

    it('considers a date in the future to be invalid', () => {
        // given
        let value: Date = new Date('2018-09-20T08:28:02Z');
        constraintDescriptor.getAttribute.mockImplementationOnce(attributeName => {
            if (attributeName === 'present') { return false; }
            return undefined;
        });
        // when
        let result: boolean = pastConstraintValidator.isValid(value, constraintValidationContext);
        // then
        expect(result).toBe(false);
    });

});
