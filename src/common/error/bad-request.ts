import { StatusCodes } from 'http-status-codes';
import GenericError from './generic';
import ErrorMessage from './msg';

export default class BadRequestError extends GenericError {
    constructor(errorExplanation: string) {
        super(StatusCodes.BAD_REQUEST,'BAD_REQUEST_ERROR', ErrorMessage.BadRequestErrorMessage,errorExplanation);

    }
}