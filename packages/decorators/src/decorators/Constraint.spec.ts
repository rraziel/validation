const addConstraint: jest.Mock<any> = jest.fn();
jest.setMock('./addConstraint', {addConstraint: addConstraint});
import { Constraint } from './Constraint';

describe('@Constraint decorator', () => {

    it('adds a constraint', () => {
        // given
        let target: object|Function = function(): void { /* empty */ };
        let propertyKey: string|symbol = 'test';
        let constraintValidator: <T>(constraintValue: T) => boolean = jest.fn<(constraintValue: any) => void>();
        // when
        Constraint(constraintValidator)(target, propertyKey, undefined);
        // then
        expect(addConstraint).toHaveBeenCalledTimes(1);
        expect(addConstraint).toHaveBeenCalledWith({target, propertyKey, constraintName: 'Constraint', attributes: {validator: constraintValidator}});
    });

});
