import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ErrorMessage from './msg';
import GenericError from './generic';

export default class UnauthorizedError extends GenericError{
    constructor() {
        super(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, ErrorMessage.UnauthorizedErrorMessage);
    }
}