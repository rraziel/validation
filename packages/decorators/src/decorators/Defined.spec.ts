const addConstraint: jest.Mock<any> = jest.fn();
jest.setMock('./addConstraint', {addConstraint: addConstraint});
import { Defined } from './Defined';

describe('@Defined decorator', () => {

    it('adds a constraint', () => {
        // given
        let target: object|Function = function(): void { /* empty */ };
        let propertyKey: string|symbol = 'test';
        // when
        Defined(target, propertyKey, undefined);
        // then
        expect(addConstraint).toHaveBeenCalledTimes(1);
        expect(addConstraint).toHaveBeenCalledWith({target, propertyKey, descriptor: undefined, constraintName: 'Defined'});
    });

});
