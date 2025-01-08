import { StatusCodes } from 'http-status-codes';
import GenericError from './generic';
import ErrorMessage from './msg';

export default class NotFoundError extends GenericError {
    constructor(resourceName: string, property: string, propertyValue: any) {
        const errorExplanation: string = `The resource: ${resourceName} with property ${property} : ${propertyValue} not found`;
        super(StatusCodes.NOT_FOUND,'NOT_FOUND_ERROR', ErrorMessage.NotFoundErrorMessage,errorExplanation);
    }
}