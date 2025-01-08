import { StatusCodes } from 'http-status-codes';
import GenericError from './generic';
import ErrorMessage from './msg';

export default class ConflictError extends GenericError {
    constructor(errorExplanation: string) {
        super(StatusCodes.CONFLICT,'CONFLICT_ERROR', ErrorMessage.ConflictErrorMessage,errorExplanation);

    }
}