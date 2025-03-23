export class AppError extends Error {
    errorCode: string;

    constructor(errorCode: string) {
        const message: string = ErrorMessages[errorCode as keyof typeof ErrorMessages];
        super(message);
        this.errorCode = errorCode;

        Object.setPrototypeOf(this, AppError.prototype);
    }

    getErrorMessage() {
        return 'Error: ' + this.message;
    }
}

export enum ErrorCodes {
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    INVALID_EVENT_TYPE = 'INVALID_EVENT_TYPE',
    EMPTY_EVENT = 'EMPTY_EVENT',
};

export enum ErrorMessages {
    'INTERNAL_SERVER_ERROR' = 'Internal server error.',
    'INVALID_EVENT_TYPE' = 'The event type is invalid.',
    'EMPTY_EVENT' = 'The event has no content.',
};