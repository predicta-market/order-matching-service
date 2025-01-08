import { StatusCodes } from 'http-status-codes';
import GenericError from './generic';
import ErrorMessage from './msg';

export default class ForbiddenRequestError extends GenericError {
    constructor(errorExplanation: string) {
        super(StatusCodes.FORBIDDEN,'FORBIDDEN_REQUEST_ERROR', ErrorMessage.ForbiddenConflictErrorMessage,errorExplanation);

    }
}