const addConstraint: jest.Mock<any> = jest.fn();
jest.setMock('./addConstraint', {addConstraint: addConstraint});
import { Undefined } from './Undefined';

describe('@Undefined decorator', () => {

    it('adds a constraint', () => {
        // given
        const target: object|Function = function(): void { /* empty */ };
        const propertyKey: string|symbol = 'test';
        // when
        Undefined(target, propertyKey, undefined);
        // then
        expect(addConstraint).toHaveBeenCalledTimes(1);
        expect(addConstraint).toHaveBeenCalledWith({target, propertyKey, descriptor: undefined, constraintName: 'Undefined'});
    });

});
