import { StatusCodes } from 'http-status-codes';
import GenericError from './generic';
import ErrorMessage from './msg';

export default class InternalServerError extends GenericError {
    constructor(errorExplanation: string='Unknown error'){
        super(StatusCodes.INTERNAL_SERVER_ERROR,'INTERNAL_SERVER_ERROR', ErrorMessage.IntervalServerErrorMessage,errorExplanation);
    }
}