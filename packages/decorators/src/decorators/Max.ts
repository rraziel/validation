import {
    addConstraint,
    ConstraintDecorator
} from './ConstraintDecorator';

/**
 * Create a Max decorator, used to define that an element must be a number whose value is lower or equal to the specified maximum
 * @param maximum Maximum
 * @return Max decorator
 */
function Max(maximum: number): ConstraintDecorator {
    return (target, propertyKey, descriptor) => addConstraint(target, propertyKey, descriptor, 'Max', {
        maximum
    });
}

export {
    Max
};
