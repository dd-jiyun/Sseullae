package net.sseullae.exception;

import org.springframework.http.HttpStatus;

public class CustomException extends RuntimeException {
    private final ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public String getErrorCodeName() {
        return errorCode.name();
    }

    public HttpStatus getErrorCode() {
        return errorCode.getStatus();
    }

    public String getErrorMessage() {
        return errorCode.getMessage();
    }

}
