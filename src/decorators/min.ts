import {ConstraintDecorator} from './constraint-decorator';
import {getInfoBuilder} from './helper';

/**
 * Create a Min decorator, used to define that an element must be a number whose value is higher or equal to the specified minimum
 * @param minimum Minimum
 * @return Min decorator
 */
function Min(minimum: number): ConstraintDecorator {
    return (target, propertyKey, descriptor) => getInfoBuilder('Min', target, propertyKey, descriptor).minimum(minimum);
}

export {
    Min
};
